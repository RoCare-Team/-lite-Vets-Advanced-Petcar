"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, endSession, requireAdmin, startSession, adminConfigured } from "@/lib/auth";
import {
  UPLOAD_DIR,
  deleteBooking,
  getClinics,
  getContent,
  newId,
  saveClinics,
  saveContent,
  updateBooking,
} from "@/lib/store";
import { toMinutes } from "@/lib/slots";
import { tileIcons, tileColors } from "@/data/tile-icons";

// ─────────────────────────── Session ───────────────────────────

const attempts = (globalThis.__eliteVetsLogin ??= new Map());
const WINDOW_MS = 15 * 60 * 1000;

export async function login(_prev, formData) {
  if (!adminConfigured()) return { error: "Admin is not set up. Add ADMIN_PASSWORD to .env.local and restart." };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") || "local").split(",")[0].trim();
  const now = Date.now();
  const record = attempts.get(ip);
  if (record && now - record.first < WINDOW_MS && record.count >= 5) {
    return { error: "Too many attempts. Please wait 15 minutes and try again." };
  }

  if (!checkPassword(String(formData.get("password") || ""))) {
    const fresh = !record || now - record.first >= WINDOW_MS;
    attempts.set(ip, fresh ? { first: now, count: 1 } : { ...record, count: record.count + 1 });
    return { error: "Incorrect password." };
  }

  attempts.delete(ip);
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

// ─────────────────────────── Bookings ───────────────────────────

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export async function setBookingStatus(id, status) {
  await requireAdmin();
  if (!STATUSES.includes(status)) return;
  await updateBooking(String(id), { status });
  revalidatePath("/admin");
}

export async function removeBooking(id) {
  await requireAdmin();
  await deleteBooking(String(id));
  revalidatePath("/admin");
}

// ─────────────────────────── Clinics ───────────────────────────

const text = (formData, key, max = 200) => String(formData.get(key) ?? "").trim().slice(0, max);

export async function saveClinic(_prev, formData) {
  await requireAdmin();

  const id = text(formData, "id", 40);
  const clinic = {
    name: text(formData, "name", 100),
    area: text(formData, "area", 100),
    address: text(formData, "address", 300),
    phone: text(formData, "phone", 30),
    mapsUrl: text(formData, "mapsUrl", 500),
    active: formData.get("active") === "on",
    days: formData.getAll("days").map(Number).filter((d) => d >= 0 && d <= 6),
    open: text(formData, "open", 5),
    close: text(formData, "close", 5),
    breakStart: text(formData, "breakStart", 5),
    breakEnd: text(formData, "breakEnd", 5),
    slotMinutes: Math.min(240, Math.max(5, Number(formData.get("slotMinutes")) || 30)),
    capacity: Math.min(50, Math.max(1, Number(formData.get("capacity")) || 1)),
    blockedDates: [...new Set(text(formData, "blockedDates", 5000).match(/\d{4}-\d{2}-\d{2}/g) || [])].sort(),
  };

  if (!clinic.name) return { error: "Clinic name is required." };
  if (toMinutes(clinic.open) == null || toMinutes(clinic.close) == null || toMinutes(clinic.close) <= toMinutes(clinic.open)) {
    return { error: "Closing time must be after opening time." };
  }
  if (Boolean(clinic.breakStart) !== Boolean(clinic.breakEnd)) return { error: "Set both break start and end, or neither." };
  if (clinic.breakStart && toMinutes(clinic.breakEnd) <= toMinutes(clinic.breakStart)) {
    return { error: "Break end must be after break start." };
  }
  if (clinic.mapsUrl && !/^https?:\/\//.test(clinic.mapsUrl)) return { error: "Map link must start with https://" };

  const clinics = await getClinics();
  const index = clinics.findIndex((c) => c.id === id);
  if (index === -1) clinics.push({ id: newId(4), ...clinic });
  else clinics[index] = { ...clinics[index], ...clinic };

  await saveClinics(clinics);
  revalidatePath("/admin/clinics");
  return { ok: index === -1 ? "Clinic added." : "Saved.", created: index === -1 };
}

export async function deleteClinic(id) {
  await requireAdmin();
  const clinics = await getClinics();
  await saveClinics(clinics.filter((c) => c.id !== id));
  revalidatePath("/admin/clinics");
}

// ─────────────────────────── Content ───────────────────────────

const str = (v, max = 200) => String(v ?? "").trim().slice(0, max);

function safeHref(v) {
  const href = str(v, 300);
  return /^(\/(?!\/)|https?:\/\/|tel:|mailto:)/.test(href) ? href : "";
}

function safeImage(v) {
  const src = str(v, 500);
  return /^(\/(images|uploads)\/[\w./-]+|https:\/\/\S+)$/.test(src) && !src.includes("..") ? src : "";
}

function slug(v) {
  return str(v, 40).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function saveHomeContent(input) {
  await requireAdmin();
  const current = await getContent();
  const hero = input?.hero || {};

  const services = (input?.services || [])
    .map((s) => ({ id: slug(s.id || s.name), name: str(s.name, 80), price: str(s.price, 30), note: str(s.note, 120) }))
    .filter((s) => s.id && s.name);
  if (!services.length) return { error: "Add at least one bookable service." };
  if (new Set(services.map((s) => s.id)).size !== services.length) return { error: "Each service needs a unique ID." };

  const content = {
    hero: {
      title: str(hero.title, 120) || current.hero.title,
      subtitle: str(hero.subtitle, 300),
      tiles: (hero.tiles || [])
        .map((t) => ({
          id: str(t.id, 20) || newId(3),
          label: str(t.label, 40),
          badge: str(t.badge, 20),
          icon: tileIcons[t.icon] ? t.icon : "paw-print",
          color: tileColors[t.color] ? t.color : "blue",
          image: safeImage(t.image),
          href: safeHref(t.href),
        }))
        .filter((t) => t.label)
        .slice(0, 12),
      banners: [0, 1, 2].map((i) => ({
        image: safeImage(hero.banners?.[i]?.image),
        alt: str(hero.banners?.[i]?.alt, 150),
        caption: str(hero.banners?.[i]?.caption, 40),
        focus: ["top", "center", "bottom"].includes(hero.banners?.[i]?.focus) ? hero.banners[i].focus : "center",
      })),
    },
    services,
    settings: {
      bookingWindowDays: Math.min(90, Math.max(1, Number(input?.settings?.bookingWindowDays) || 14)),
      minLeadMinutes: Math.min(1440, Math.max(0, Number(input?.settings?.minLeadMinutes) || 0)),
    },
  };

  await saveContent(content);
  revalidatePath("/", "layout");
  return { ok: true, content };
}

const IMAGE_TYPES = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/avif": "avif", "image/gif": "gif" };

export async function uploadImage(formData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!file || typeof file === "string") return { error: "No file selected." };
  const ext = IMAGE_TYPES[file.type];
  if (!ext) return { error: "Use a PNG, JPG, WebP, AVIF or GIF image." };
  if (file.size > 5 * 1024 * 1024) return { error: "Image must be under 5 MB." };

  const name = `${newId(10)}.${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return { url: `/uploads/${name}` };
}
