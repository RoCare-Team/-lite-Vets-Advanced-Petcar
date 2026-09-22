"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { removeBooking, setBookingStatus } from "@/app/admin/actions";
import { formatDate, formatTime } from "@/lib/slots";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export default function BookingActions({ booking, tone }) {
  const [pending, start] = useTransition();

  const digits = booking.phone.replace(/\D/g, "");
  const waNumber = digits.length === 10 ? `91${digits}` : digits;
  const message = `Hello ${booking.ownerName}, your appointment for ${booking.petName} (${booking.serviceName}) at ${booking.clinicName} on ${formatDate(
    booking.date
  )} at ${formatTime(booking.time)} is confirmed. Booking ID: ${booking.ref}`;

  return (
    <div className="flex items-center gap-2 lg:justify-end">
      {pending && <Loader2 aria-label="Saving" className="size-4 animate-spin text-muted" />}
      <label className="sr-only" htmlFor={`status-${booking.id}`}>
        Status
      </label>
      <select
        id={`status-${booking.id}`}
        value={booking.status}
        disabled={pending}
        onChange={(e) => start(() => setBookingStatus(booking.id, e.target.value))}
        className={`h-9 rounded-full border-0 px-3 text-sm font-semibold capitalize ${tone}`}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <a
        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Send confirmation on WhatsApp"
        className="grid size-9 place-items-center rounded-full text-[#25D366] ring-1 ring-line hover:bg-cream"
      >
        <WhatsAppIcon className="size-4" />
        <span className="sr-only">WhatsApp {booking.ownerName}</span>
      </a>
      <button
        type="button"
        disabled={pending}
        title="Delete booking"
        onClick={() => {
          if (confirm(`Delete booking ${booking.ref}? This can't be undone.`)) start(() => removeBooking(booking.id));
        }}
        className="grid size-9 place-items-center rounded-full text-muted ring-1 ring-line hover:bg-emergency/10 hover:text-emergency"
      >
        <Trash2 aria-hidden="true" className="size-4" />
        <span className="sr-only">Delete booking</span>
      </button>
    </div>
  );
}
