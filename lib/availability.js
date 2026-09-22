import { getBookings, getClinics, getContent } from "./store";
import { clinicNow, isClinicOpenOn, slotsFor, upcomingDates } from "./slots";

/** Earliest bookable slot across all active clinics, or null. */
export async function nextAvailableSlot() {
  const [clinics, { settings }, bookings] = await Promise.all([getClinics(), getContent(), getBookings()]);
  let best = null;

  for (const clinic of clinics.filter((c) => c.active)) {
    for (const { date, open } of upcomingDates(clinic, settings.bookingWindowDays)) {
      if (!open) continue;
      const taken = bookings.filter((b) => b.clinicId === clinic.id && b.date === date && b.status !== "cancelled");
      const slot = slotsFor(clinic, date, taken, settings).find((s) => s.available);
      if (slot) {
        if (!best || `${date}${slot.time}` < `${best.date}${best.time}`) best = { clinicId: clinic.id, date, time: slot.time };
        break;
      }
    }
  }
  return best;
}

/** Today's hours for the first active clinic: { open, close } or { closed: true }. */
export async function todayHours() {
  const clinic = (await getClinics()).find((c) => c.active);
  if (!clinic) return null;
  return isClinicOpenOn(clinic, clinicNow().date) ? { open: clinic.open, close: clinic.close } : { closed: true };
}
