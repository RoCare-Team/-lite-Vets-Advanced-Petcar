"use client";

import { useActionState, useEffect, useRef, useTransition } from "react";
import { Loader2, Save, Trash2 } from "lucide-react";
import { deleteClinic, saveClinic } from "@/app/admin/actions";
import { WEEKDAYS } from "@/lib/slots";
import { Label, inputClass } from "./fields";

export default function ClinicForm({ clinic, isNew = false }) {
  const [state, action, pending] = useActionState(saveClinic, null);
  const [deleting, startDelete] = useTransition();
  const formRef = useRef(null);

  // Clear the "add clinic" form once the clinic has been created.
  useEffect(() => {
    if (isNew && state?.created) formRef.current?.reset();
  }, [isNew, state]);

  return (
    <form ref={formRef} action={action} className="grid gap-5">
      <input type="hidden" name="id" value={clinic.id} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Label text="Clinic name *">
          <input name="name" required defaultValue={clinic.name} className={inputClass} />
        </Label>
        <Label text="Area / locality">
          <input name="area" defaultValue={clinic.area} placeholder="e.g. Sector 45, Gurugram" className={inputClass} />
        </Label>
        <Label text="Full address" className="sm:col-span-2">
          <input name="address" defaultValue={clinic.address} className={inputClass} />
        </Label>
        <Label text="Phone">
          <input name="phone" defaultValue={clinic.phone} className={inputClass} />
        </Label>
        <Label text="Google Maps link">
          <input name="mapsUrl" type="url" defaultValue={clinic.mapsUrl} className={inputClass} />
        </Label>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-navy">Open on</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {WEEKDAYS.map((d, i) => (
            <label key={d} className="cursor-pointer">
              <input type="checkbox" name="days" value={i} defaultChecked={clinic.days.includes(i)} className="peer sr-only" />
              <span className="inline-flex h-10 w-12 items-center justify-center rounded-xl border border-line text-sm font-semibold text-muted peer-checked:border-teal peer-checked:bg-teal-soft peer-checked:text-teal-dark peer-focus-visible:ring-2 peer-focus-visible:ring-teal">
                {d}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <Label text="Opens">
          <input type="time" name="open" required defaultValue={clinic.open} className={inputClass} />
        </Label>
        <Label text="Closes">
          <input type="time" name="close" required defaultValue={clinic.close} className={inputClass} />
        </Label>
        <Label text="Break from">
          <input type="time" name="breakStart" defaultValue={clinic.breakStart} className={inputClass} />
        </Label>
        <Label text="Break until">
          <input type="time" name="breakEnd" defaultValue={clinic.breakEnd} className={inputClass} />
        </Label>
        <Label text="Slot length">
          <select name="slotMinutes" defaultValue={clinic.slotMinutes} className={inputClass}>
            {[10, 15, 20, 30, 45, 60, 90, 120].map((m) => (
              <option key={m} value={m}>
                {m} min
              </option>
            ))}
          </select>
        </Label>
        <Label text="Bookings per slot">
          <input type="number" name="capacity" min={1} max={50} defaultValue={clinic.capacity} className={inputClass} />
        </Label>
      </div>

      <Label text="Closed dates (holidays) — one per line, YYYY-MM-DD">
        <textarea
          name="blockedDates"
          rows={3}
          defaultValue={clinic.blockedDates.join("\n")}
          placeholder={"2026-10-20\n2026-11-08"}
          className={`${inputClass} h-auto py-2.5 font-mono`}
        />
      </Label>

      <label className="flex items-center gap-2 text-sm font-semibold text-navy">
        <input type="checkbox" name="active" defaultChecked={clinic.active} className="size-4 accent-teal" />
        Show on booking page
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          disabled={pending}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-teal px-6 text-sm font-semibold text-white hover:bg-teal-dark disabled:opacity-60"
        >
          {pending ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Save aria-hidden="true" className="size-4" />}
          {isNew ? "Add clinic" : "Save changes"}
        </button>
        {!isNew && (
          <button
            type="button"
            disabled={deleting}
            onClick={() => {
              if (confirm(`Delete ${clinic.name}? Existing bookings are kept.`)) startDelete(() => deleteClinic(clinic.id));
            }}
            className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted hover:bg-emergency/10 hover:text-emergency"
          >
            <Trash2 aria-hidden="true" className="size-4" /> Delete
          </button>
        )}
        {state?.error && (
          <p role="alert" className="text-sm font-medium text-emergency">
            {state.error}
          </p>
        )}
        {state?.ok && (
          <p role="status" className="text-sm font-medium text-teal">
            {state.ok}
          </p>
        )}
      </div>
    </form>
  );
}
