import { isAdmin } from "@/lib/auth";
import { getBookings } from "@/lib/store";

const COLUMNS = ["ref", "status", "date", "time", "clinicName", "serviceName", "ownerName", "phone", "email", "petName", "petType", "notes", "createdAt"];

function cell(value) {
  let s = String(value ?? "");
  if (/^[=+\-@]/.test(s)) s = `'${s}`; // keep spreadsheet apps from running formulas
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const bookings = (await getBookings()).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  const csv = [COLUMNS.join(","), ...bookings.map((b) => COLUMNS.map((c) => cell(b[c])).join(","))].join("\n");
  return new Response("\uFEFF" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bookings-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
