"use server";

import crypto from "node:crypto";
import { getClinics, getContent, getActiveBookings, insertBooking, newId } from "@/lib/store";
import { slotsFor, upcomingDates, slotTimes } from "@/lib/slots";

async function findClinic(clinicId) {
  const clinics = await getClinics();
  return clinics.find((c) => c.id === clinicId && c.active);
}

/** Slots with live availability for the booking page. */
export async function getAvailability(clinicId, date) {
  const clinic = await findClinic(clinicId);
  if (!clinic || !/^\d{4}-\d{2}-\d{2}$/.test(date || "")) return [];
  const { settings } = await getContent();
  return slotsFor(clinic, date, await getActiveBookings(clinicId, date), settings);
}

function clean(value, max) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function reference() {
  // Unambiguous characters only (no 0/O, 1/I).
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(6);
  return "EV-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export async function createBooking(input) {
  const clinic = await findClinic(input?.clinicId);
  if (!clinic) return { error: "Please choose a clinic." };

  const { services, settings } = await getContent();
  const service = services.find((s) => s.id === input.serviceId);
  if (!service) return { error: "Please choose a service." };

  const date = String(input.date || "");
  const allowed = upcomingDates(clinic, settings.bookingWindowDays);
  if (!allowed.some((d) => d.date === date && d.open)) return { error: "That date isn't available. Please pick another." };

  const time = String(input.time || "");
  if (!slotTimes(clinic).includes(time)) return { error: "Please choose a time slot." };

  const ownerName = clean(input.ownerName, 80);
  const phone = String(input.phone || "").replace(/[^\d+]/g, "");
  const digits = phone.replace(/\D/g, "");
  const email = clean(input.email, 120);
  const petName = clean(input.petName, 60);
  const petType = clean(input.petType, 30);
  const notes = String(input.notes ?? "").trim().slice(0, 600);

  if (ownerName.length < 2) return { error: "Please enter your name." };
  if (digits.length < 10 || digits.length > 13) return { error: "Please enter a valid 10-digit mobile number." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (!petName) return { error: "Please enter your pet's name." };

  const booking = {
    id: newId(),
    ref: reference(),
    clinicId: clinic.id,
    clinicName: clinic.name,
    serviceId: service.id,
    serviceName: service.name,
    date,
    time,
    ownerName,
    phone,
    email,
    petName,
    petType,
    notes,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const result = await insertBooking(booking, (all) => {
    const sameSlot = all.filter(
      (b) => b.clinicId === clinic.id && b.date === date && b.status !== "cancelled"
    );
    const slot = slotsFor(clinic, date, sameSlot, settings).find((s) => s.time === time);
    if (!slot?.available) return "Sorry, that slot was just taken. Please choose another time.";
    const last10 = digits.slice(-10);
    if (sameSlot.some((b) => b.time === time && b.phone.replace(/\D/g, "").slice(-10) === last10)) {
      return "You already have a booking at this time.";
    }
    return null;
  });

  if (result.error) return { error: result.error };
  const { id, ref, clinicName, serviceName } = result.booking;
  return { booking: { id, ref, clinicName, serviceName, date, time, ownerName, petName, phone } };
}
