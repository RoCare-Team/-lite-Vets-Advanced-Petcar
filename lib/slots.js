// Pure date/slot helpers shared by the booking page, the server and the admin.
// Dates are "YYYY-MM-DD" strings and times "HH:MM", always in clinic time
// (India, UTC+5:30) so the result never depends on the visitor's timezone.

const TZ = "Asia/Kolkata";
const DAY_MS = 86_400_000;

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function toMinutes(time) {
  if (!/^\d{2}:\d{2}$/.test(time || "")) return null;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function fromMinutes(total) {
  const h = String(Math.floor(total / 60)).padStart(2, "0");
  const m = String(total % 60).padStart(2, "0");
  return `${h}:${m}`;
}

/** "14:30" → "2:30 PM" */
export function formatTime(time) {
  const mins = toMinutes(time);
  if (mins == null) return time;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** "2026-09-22" → "Tue, 22 Sep 2026" */
export function formatDate(date, { year = true } = {}) {
  const d = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-IN", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    ...(year ? { year: "numeric" } : {}),
  });
}

/** Current date and minute-of-day in clinic time. */
export function clinicNow(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );
  return { date: `${parts.year}-${parts.month}-${parts.day}`, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

export function addDays(date, n) {
  return new Date(new Date(`${date}T00:00:00Z`).getTime() + n * DAY_MS).toISOString().slice(0, 10);
}

export function weekday(date) {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

export function isClinicOpenOn(clinic, date) {
  return clinic.days.includes(weekday(date)) && !(clinic.blockedDates || []).includes(date);
}

/** All slot start times for a clinic's working day, skipping the break. */
export function slotTimes(clinic) {
  const open = toMinutes(clinic.open);
  const close = toMinutes(clinic.close);
  const step = Number(clinic.slotMinutes) || 30;
  const bStart = toMinutes(clinic.breakStart);
  const bEnd = toMinutes(clinic.breakEnd);
  if (open == null || close == null || close <= open) return [];

  const times = [];
  for (let t = open; t + step <= close; t += step) {
    const inBreak = bStart != null && bEnd != null && t < bEnd && t + step > bStart;
    if (!inBreak) times.push(fromMinutes(t));
  }
  return times;
}

/** Bookable dates from today, `days` long. */
export function upcomingDates(clinic, days, now = new Date()) {
  const today = clinicNow(now).date;
  return Array.from({ length: days }, (_, i) => {
    const date = addDays(today, i);
    return { date, open: clinic ? isClinicOpenOn(clinic, date) : true };
  });
}

/**
 * Slots for one clinic/date with availability.
 * `bookings` — active (non-cancelled) bookings for that clinic and date.
 */
export function slotsFor(clinic, date, bookings, { minLeadMinutes = 60, now = new Date() } = {}) {
  if (!isClinicOpenOn(clinic, date)) return [];
  const current = clinicNow(now);
  if (date < current.date) return [];

  const counts = {};
  for (const b of bookings) counts[b.time] = (counts[b.time] || 0) + 1;
  const capacity = Math.max(1, Number(clinic.capacity) || 1);

  return slotTimes(clinic).map((time) => {
    const tooSoon = date === current.date && toMinutes(time) < current.minutes + minLeadMinutes;
    const left = capacity - (counts[time] || 0);
    return { time, left: Math.max(0, left), available: !tooSoon && left > 0 };
  });
}
