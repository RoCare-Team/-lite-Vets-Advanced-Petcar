import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Single-password admin login. Set ADMIN_PASSWORD (and ideally SESSION_SECRET)
// in .env.local. The session cookie is "<expiry>.<hmac>" — nothing to store.

const COOKIE = "ev_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function secret() {
  return process.env.SESSION_SECRET || `elite-vets:${process.env.ADMIN_PASSWORD || ""}`;
}

function sign(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(password) {
  return adminConfigured() && safeEqual(password, process.env.ADMIN_PASSWORD);
}

export async function startSession() {
  const expires = String(Date.now() + MAX_AGE * 1000);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value || "";
  const [expires, mac] = value.split(".");
  return Boolean(expires && mac && Number(expires) > Date.now() && safeEqual(mac, sign(expires)));
}

/** Guard for admin pages and server actions. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
