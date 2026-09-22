import ClinicForm from "@/components/admin/ClinicForm";
import { getClinics } from "@/lib/store";
import { formatTime, slotTimes } from "@/lib/slots";

const EMPTY = {
  id: "",
  name: "",
  area: "",
  address: "",
  phone: "",
  mapsUrl: "",
  active: true,
  days: [1, 2, 3, 4, 5, 6],
  open: "10:00",
  close: "19:00",
  breakStart: "",
  breakEnd: "",
  slotMinutes: 30,
  capacity: 1,
  blockedDates: [],
};

export default async function ClinicsPage() {
  const clinics = await getClinics();

  return (
    <>
      <h1 className="text-3xl">Clinics &amp; slots</h1>
      <p className="mt-1 text-sm text-muted">
        Opening days, hours, slot length and how many pets can be booked into each slot. Changes apply to the booking page immediately.
      </p>

      <div className="mt-6 grid gap-4">
        {clinics.map((c) => (
          <details key={c.id} className="group rounded-card border border-line bg-white" open={clinics.length === 1}>
            <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2 p-5">
              <span>
                <span className="font-bold text-navy">{c.name}</span>
                {!c.active && (
                  <span className="ml-2 rounded-full bg-emergency/10 px-2 py-0.5 text-xs font-semibold text-emergency">Hidden</span>
                )}
                <span className="block text-sm text-muted">
                  {formatTime(c.open)} – {formatTime(c.close)} · {slotTimes(c).length} slots/day × {c.capacity} per slot
                </span>
              </span>
              <span className="text-sm font-semibold text-teal group-open:hidden">Edit</span>
            </summary>
            <div className="border-t border-line p-5">
              <ClinicForm clinic={c} />
            </div>
          </details>
        ))}

        <details className="rounded-card border border-dashed border-teal/40 bg-white">
          <summary className="cursor-pointer list-none p-5 font-semibold text-teal">+ Add a clinic</summary>
          <div className="border-t border-line p-5">
            <ClinicForm clinic={EMPTY} isNew />
          </div>
        </details>
      </div>
    </>
  );
}
