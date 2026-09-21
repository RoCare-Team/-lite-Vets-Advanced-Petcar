"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { services } from "@/data/services";
import { whatsappLink } from "@/lib/site";

// Appointment requests are sent via WhatsApp — the clinic's existing booking
// channel — so no backend is required. The form composes the message.
export default function AppointmentForm() {
  const [values, setValues] = useState({ name: "", phone: "", pet: "", service: "", date: "", message: "" });
  const [error, setError] = useState("");

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setError("Please add your name and a valid phone number.");
      form.reportValidity();
      return;
    }
    setError("");
    const details = [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      values.pet && `Pet: ${values.pet}`,
      `Service: ${values.service || "General consultation"}`,
      values.date && `Preferred date: ${values.date}`,
      values.message && `Details: ${values.message}`,
    ].filter(Boolean);
    const message = `Hello, I would like to book an appointment at The Élite Vets Advanced Petcare.\n\n${details.join("\n")}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  const field =
    "mt-2 block h-12 w-full rounded-xl border border-line bg-white px-4 text-[0.97rem] text-ink placeholder:text-muted/60 transition-shadow focus:border-teal focus:ring-4 focus:ring-teal/15 focus:outline-none";
  const label = "text-sm font-semibold text-navy";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="appt-name" className={label}>
          Your name <span className="text-emergency">*</span>
        </label>
        <input id="appt-name" required autoComplete="name" value={values.name} onChange={set("name")} className={field} />
      </div>
      <div>
        <label htmlFor="appt-phone" className={label}>
          Phone <span className="text-emergency">*</span>
        </label>
        <input
          id="appt-phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          pattern="[0-9+\-\s]{10,15}"
          value={values.phone}
          onChange={set("phone")}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="appt-pet" className={label}>
          Pet &amp; breed
        </label>
        <input id="appt-pet" placeholder="e.g. Labrador, 4 years" value={values.pet} onChange={set("pet")} className={field} />
      </div>
      <div>
        <label htmlFor="appt-date" className={label}>
          Preferred date
        </label>
        <input id="appt-date" type="date" value={values.date} onChange={set("date")} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="appt-service" className={label}>
          Service
        </label>
        <select id="appt-service" value={values.service} onChange={set("service")} className={field}>
          <option value="">General consultation</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="appt-message" className={label}>
          Tell us a little about your pet&apos;s needs
        </label>
        <textarea
          id="appt-message"
          rows={4}
          value={values.message}
          onChange={set("message")}
          className={`${field} h-auto py-3`}
        />
      </div>

      <div className="sm:col-span-2">
        {error && (
          <p role="alert" className="mb-4 rounded-xl bg-emergency/10 px-4 py-3 text-sm font-medium text-emergency">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-teal px-7 font-semibold text-white shadow-[0_10px_24px_-10px_rgb(15_139_141/0.7)] transition-colors hover:bg-teal-dark sm:w-auto"
        >
          <WhatsAppIcon className="size-5" /> Send request on WhatsApp
          <Send aria-hidden="true" className="size-4" />
        </button>
        <p className="mt-3 text-xs text-muted">
          Opens WhatsApp with your details filled in. For emergencies, please call us directly.
        </p>
      </div>
    </form>
  );
}
