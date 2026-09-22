import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { defaultContent, defaultClinics } from "@/data/defaults";

// Tiny JSON-file database for admin content, clinics and bookings.
// Files live in STORAGE_DIR (default ./storage). This needs a server with a
// persistent disk (VPS, `next start`, Docker volume). On serverless hosting
// with a read-only filesystem, swap these functions for a real database —
// every caller goes through this module.

const DIR = process.env.STORAGE_DIR || path.join(/*turbopackIgnore: true*/ process.cwd(), "storage");
export const UPLOAD_DIR = path.join(/*turbopackIgnore: true*/ DIR, "uploads");

// Serialise writes across route handlers and server actions in this process.
const lock = (globalThis.__eliteVetsLock ??= { queue: Promise.resolve() });
function withLock(fn) {
  const run = lock.queue.then(fn, fn);
  lock.queue = run.catch(() => {});
  return run;
}

async function read(name, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(DIR, `${name}.json`), "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return structuredClone(fallback);
    throw err;
  }
}

async function write(name, data) {
  await fs.mkdir(DIR, { recursive: true });
  const file = path.join(DIR, `${name}.json`);
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2));
  try {
    await fs.rename(tmp, file);
  } catch {
    // Windows/OneDrive can briefly lock the target; fall back to a direct write.
    await fs.writeFile(file, JSON.stringify(data, null, 2));
    await fs.rm(tmp, { force: true });
  }
}

export function newId(bytes = 6) {
  return crypto.randomBytes(bytes).toString("hex");
}

// ─────────────────────────── Content ───────────────────────────

export async function getContent() {
  const stored = await read("content", {});
  return {
    hero: { ...defaultContent.hero, ...stored.hero },
    services: stored.services ?? defaultContent.services,
    settings: { ...defaultContent.settings, ...stored.settings },
  };
}

export function saveContent(content) {
  return withLock(() => write("content", content));
}

// ─────────────────────────── Clinics ───────────────────────────

export function getClinics() {
  return read("clinics", defaultClinics);
}

export function saveClinics(clinics) {
  return withLock(() => write("clinics", clinics));
}

// ─────────────────────────── Bookings ───────────────────────────

export function getBookings() {
  return read("bookings", []);
}

export async function getActiveBookings(clinicId, date) {
  const all = await getBookings();
  return all.filter((b) => b.clinicId === clinicId && b.date === date && b.status !== "cancelled");
}

/**
 * Inserts a booking if `check(existingBookings)` returns nothing; otherwise
 * returns `{ error }` from check. Runs under the write lock so two visitors
 * cannot take the last place in a slot at the same time.
 */
export function insertBooking(booking, check) {
  return withLock(async () => {
    const all = await read("bookings", []);
    const error = check(all);
    if (error) return { error };
    all.push(booking);
    await write("bookings", all);
    return { booking };
  });
}

export function updateBooking(id, patch) {
  return withLock(async () => {
    const all = await read("bookings", []);
    const i = all.findIndex((b) => b.id === id);
    if (i === -1) return null;
    all[i] = { ...all[i], ...patch, updatedAt: new Date().toISOString() };
    await write("bookings", all);
    return all[i];
  });
}

export function deleteBooking(id) {
  return withLock(async () => {
    const all = await read("bookings", []);
    await write("bookings", all.filter((b) => b.id !== id));
  });
}
