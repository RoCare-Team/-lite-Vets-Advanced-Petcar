import Link from "next/link";
import { Download, Phone, Search } from "lucide-react";
import BookingActions from "@/components/admin/BookingActions";
import { getBookings, getClinics } from "@/lib/store";
import { addDays, clinicNow, formatDate, formatTime } from "@/lib/slots";

const VIEWS = [
  { id: "upcoming", label: "Upcoming" },
  { id: "today", label: "Today" },
  { id: "past", label: "Past" },
  { id: "all", label: "All" },
];

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-teal-soft text-teal-dark",
  completed: "bg-navy/10 text-navy",
  cancelled: "bg-emergency/10 text-emergency",
};

export default async function BookingsPage({ searchParams }) {
  const params = await searchParams;
  const view = VIEWS.some((v) => v.id === params.view) ? params.view : "upcoming";
  const clinicFilter = typeof params.clinic === "string" ? params.clinic : "";
  const statusFilter = typeof params.status === "string" ? params.status : "";
  const q = typeof params.q === "string" ? params.q.trim().toLowerCase() : "";

  const [bookings, clinics] = await Promise.all([getBookings(), getClinics()]);
  const today = clinicNow().date;
  const weekEnd = addDays(today, 7);

  const stats = [
    { label: "Today", value: bookings.filter((b) => b.date === today && b.status !== "cancelled").length },
    { label: "Awaiting confirmation", value: bookings.filter((b) => b.status === "pending" && b.date >= today).length },
    { label: "Next 7 days", value: bookings.filter((b) => b.date >= today && b.date < weekEnd && b.status !== "cancelled").length },
    { label: "All time", value: bookings.length },
  ];

  const rows = bookings
    .filter((b) => {
      if (view === "upcoming" && b.date < today) return false;
      if (view === "today" && b.date !== today) return false;
      if (view === "past" && b.date >= today) return false;
      if (clinicFilter && b.clinicId !== clinicFilter) return false;
      if (statusFilter && b.status !== statusFilter) return false;
      if (q && ![b.ref, b.ownerName, b.phone, b.petName, b.email].join(" ").toLowerCase().includes(q)) return false;
      return true;
    })
    .sort((a, b) => {
      const order = `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`);
      return view === "past" || view === "all" ? -order : order;
    });

  const link = (patch) => {
    const next = new URLSearchParams({ view, clinic: clinicFilter, status: statusFilter, q: params.q || "", ...patch });
    for (const [k, v] of [...next]) if (!v) next.delete(k);
    return `/admin?${next}`;
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl">Bookings</h1>
          <p className="mt-1 text-sm text-muted">Confirm, complete or cancel appointment requests.</p>
        </div>
        <a
          href="/admin/export"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-navy hover:bg-cream"
        >
          <Download aria-hidden="true" className="size-4" /> Export CSV
        </a>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-card border border-line bg-white p-4">
            <dt className="text-xs font-semibold text-muted">{s.label}</dt>
            <dd className="mt-1 text-2xl font-bold text-navy">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {VIEWS.map((v) => (
          <Link
            key={v.id}
            href={link({ view: v.id })}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${v.id === view ? "bg-navy text-white" : "bg-white text-ink ring-1 ring-line hover:bg-cream"}`}
          >
            {v.label}
          </Link>
        ))}
        <form className="ml-auto flex flex-wrap gap-2" action="/admin">
          <input type="hidden" name="view" value={view} />
          {clinics.length > 1 && (
            <select name="clinic" defaultValue={clinicFilter} className="h-10 rounded-full border border-line bg-white px-3 text-sm">
              <option value="">All clinics</option>
              {clinics.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
          <select name="status" defaultValue={statusFilter} className="h-10 rounded-full border border-line bg-white px-3 text-sm">
            <option value="">Any status</option>
            {Object.keys(STATUS_STYLES).map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
          <label className="relative">
            <span className="sr-only">Search</span>
            <Search aria-hidden="true" className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input
              name="q"
              defaultValue={params.q || ""}
              placeholder="Name, phone, ID…"
              className="h-10 w-48 rounded-full border border-line bg-white pr-3 pl-9 text-sm"
            />
          </label>
          <button className="h-10 rounded-full bg-teal px-4 text-sm font-semibold text-white hover:bg-teal-dark">Filter</button>
        </form>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 rounded-card border border-dashed border-line bg-white p-10 text-center text-sm text-muted">
          No bookings match these filters.
        </p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {rows.map((b) => (
            <li key={b.id} className="grid gap-4 rounded-card border border-line bg-white p-4 sm:p-5 lg:grid-cols-[9rem_1fr_1fr_auto] lg:items-center">
              <div>
                <p className={`font-bold ${b.date === today ? "text-teal" : "text-navy"}`}>
                  {b.date === today ? "Today" : formatDate(b.date, { year: false })}
                </p>
                <p className="text-sm text-ink">{formatTime(b.time)}</p>
                <p className="mt-1 font-mono text-xs text-muted">{b.ref}</p>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-navy">
                  {b.petName} <span className="font-normal text-muted">· {b.petType}</span>
                </p>
                <p className="text-sm text-ink">{b.ownerName}</p>
                <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 text-sm text-teal hover:text-teal-dark">
                  <Phone aria-hidden="true" className="size-3.5" /> {b.phone}
                </a>
                {b.email && <p className="truncate text-xs text-muted">{b.email}</p>}
              </div>
              <div className="min-w-0 text-sm">
                <p className="font-semibold text-navy">{b.serviceName}</p>
                <p className="text-muted">{b.clinicName}</p>
                {b.notes && <p className="mt-1 line-clamp-2 text-xs text-ink/80">“{b.notes}”</p>}
              </div>
              <BookingActions booking={b} tone={STATUS_STYLES[b.status]} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
