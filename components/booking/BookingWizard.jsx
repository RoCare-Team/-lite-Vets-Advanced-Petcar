"use client";

import { useContext, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  PawPrint,
  Phone,
  Stethoscope,
} from "lucide-react";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { CloseModalContext } from "./BookingModal";
import { getAvailability, createBooking } from "@/lib/booking-actions";
import { addDays, formatDate, formatTime, isClinicOpenOn, WEEKDAYS, weekday } from "@/lib/slots";
import { whatsappLink } from "@/lib/site";

const STEPS = ["Clinic", "Service", "Date & time", "Your details"];
const PET_TYPES = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

export default function BookingWizard({ clinics, services, windowDays, today, initialService, initialClinic }) {
  const startClinic = clinics.find((c) => c.id === initialClinic) || (clinics.length === 1 ? clinics[0] : null);
  const startService = services.find((s) => s.id === initialService) || null;

  const [step, setStep] = useState(startClinic ? (startService ? 2 : 1) : 0);
  const [clinicId, setClinicId] = useState(startClinic?.id || "");
  const [serviceId, setServiceId] = useState(startService?.id || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState({ ownerName: "", phone: "", email: "", petName: "", petType: "Dog", notes: "" });
  const [slots, setSlots] = useState(null);
  const [slotVersion, setSlotVersion] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);
  const [submitting, startSubmit] = useTransition();
  // True while the date was picked for the visitor (not by them), so we can
  // skip ahead past days that are already fully booked.
  const autoDate = useRef(true);
  const root = useRef(null);
  // Scrolls the page — or the modal, when open in one — back to the wizard top.
  const toTop = () => root.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const clinic = clinics.find((c) => c.id === clinicId);
  const service = services.find((s) => s.id === serviceId);

  const dates = useMemo(
    () =>
      Array.from({ length: windowDays }, (_, i) => {
        const d = addDays(today, i);
        return { date: d, open: clinic ? isClinicOpenOn(clinic, d) : false };
      }),
    [clinic, today, windowDays]
  );

  // Default to the first open day once a clinic is chosen.
  useEffect(() => {
    if (clinic && (!date || !dates.some((d) => d.date === date && d.open))) {
      autoDate.current = true;
      setDate(dates.find((d) => d.open)?.date || "");
      setTime("");
    }
  }, [clinic, dates, date]);

  // Live availability for the chosen day.
  useEffect(() => {
    if (!clinicId || !date) return;
    let cancelled = false;
    setSlots(null);
    getAvailability(clinicId, date).then((result) => {
      if (cancelled) return;
      const nextOpen = dates.find((d) => d.open && d.date > date)?.date;
      if (autoDate.current && nextOpen && !result.some((s) => s.available)) setDate(nextOpen);
      else setSlots(result);
    });
    return () => {
      cancelled = true;
    };
  }, [clinicId, date, dates, slotVersion]);

  function go(next) {
    setError("");
    setStep(next);
    toTop();
  }

  function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setError("");
    startSubmit(async () => {
      const result = await createBooking({ clinicId, serviceId, date, time, ...details });
      if (result.error) {
        setError(result.error);
        if (/slot|time/i.test(result.error)) {
          setTime("");
          setSlotVersion((v) => v + 1);
          setStep(2);
        }
        return;
      }
      setDone(result.booking);
      toTop();
    });
  }

  if (done)
    return (
      <div ref={root}>
        <Confirmation booking={done} clinic={clinic} />
      </div>
    );

  const canContinue = [Boolean(clinic), Boolean(service), Boolean(date && time)][step] ?? true;

  return (
    <div ref={root} className="grid scroll-mt-28 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-8">
      <div className="min-w-0 rounded-panel border border-line bg-white shadow-soft">
        <Stepper step={step} onJump={(i) => i < step && go(i)} />

        <div className="p-5 sm:p-8">
          {error && (
            <p role="alert" className="mb-5 rounded-xl bg-emergency/10 px-4 py-3 text-sm font-medium text-emergency">
              {error}
            </p>
          )}

          {step === 0 && (
            <StepSection title="Choose a clinic" hint="Pick the clinic you'd like to visit.">
              <div className="grid gap-3 sm:grid-cols-2">
                {clinics.map((c) => (
                  <Choice
                    key={c.id}
                    selected={c.id === clinicId}
                    onClick={() => {
                      setClinicId(c.id);
                      setTime("");
                      go(1);
                    }}
                  >
                    <span className="block font-bold text-navy">{c.name}</span>
                    <span className="mt-1 flex items-start gap-1.5 text-sm text-muted">
                      <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" /> {c.address}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <Clock aria-hidden="true" className="size-4 shrink-0" /> {formatTime(c.open)} – {formatTime(c.close)}
                    </span>
                  </Choice>
                ))}
              </div>
            </StepSection>
          )}

          {step === 1 && (
            <StepSection title="What does your pet need?" hint="Choose the service for this visit.">
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <Choice
                    key={s.id}
                    selected={s.id === serviceId}
                    onClick={() => {
                      setServiceId(s.id);
                      go(2);
                    }}
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-bold text-navy">{s.name}</span>
                      {s.price && <span className="shrink-0 text-sm font-semibold text-teal-dark">{s.price}</span>}
                    </span>
                    {s.note && <span className="mt-1 block text-sm text-muted">{s.note}</span>}
                  </Choice>
                ))}
              </div>
            </StepSection>
          )}

          {step === 2 && (
            <StepSection title="Pick a date and time" hint={clinic ? `Times shown are for ${clinic.name}.` : ""}>
              <div className="-mx-5 flex snap-x scroll-px-5 gap-2.5 overflow-x-auto px-5 pb-2 no-scrollbar sm:-mx-8 sm:scroll-px-8 sm:px-8">
                {dates.map((d) => {
                  const selected = d.date === date;
                  const day = new Date(`${d.date}T00:00:00Z`);
                  return (
                    <button
                      key={d.date}
                      type="button"
                      disabled={!d.open}
                      onClick={() => {
                        autoDate.current = false;
                        setDate(d.date);
                        setTime("");
                      }}
                      aria-pressed={selected}
                      className={`flex w-[4.5rem] shrink-0 snap-start flex-col items-center rounded-2xl border py-3 transition-colors ${
                        selected
                          ? "border-teal bg-teal text-white"
                          : d.open
                            ? "border-line bg-white text-navy hover:border-teal/50"
                            : "cursor-not-allowed border-line bg-cream text-muted/50 line-through"
                      }`}
                    >
                      <span className="text-[0.7rem] font-semibold uppercase">
                        {d.date === today ? "Today" : d.date === addDays(today, 1) ? "Tmrw" : WEEKDAYS[weekday(d.date)]}
                      </span>
                      <span className="text-xl leading-tight font-bold">{day.getUTCDate()}</span>
                      <span className="text-[0.7rem]">{day.toLocaleString("en-IN", { month: "short", timeZone: "UTC" })}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                {!date ? (
                  <p className="text-sm text-muted">This clinic has no open days in the booking window.</p>
                ) : slots === null ? (
                  <p className="flex items-center gap-2 text-sm text-muted">
                    <Loader2 aria-hidden="true" className="size-4 animate-spin" /> Checking available slots…
                  </p>
                ) : slots.filter((s) => s.available).length === 0 ? (
                  <p className="rounded-xl bg-cream px-4 py-3 text-sm text-muted">
                    No slots left on {formatDate(date, { year: false })}. Please try another day.
                  </p>
                ) : (
                  <SlotGroups
                    slots={slots}
                    time={time}
                    onPick={(t) => {
                      setTime(t);
                      go(3);
                    }}
                  />
                )}
              </div>
            </StepSection>
          )}

          {step === 3 && (
            <form id="booking-details" onSubmit={submit} noValidate>
              <StepSection title="Your details" hint="We'll use these to confirm your appointment.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" required>
                    <input
                      required
                      minLength={2}
                      autoComplete="name"
                      value={details.ownerName}
                      onChange={(e) => setDetails({ ...details, ownerName: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Mobile number" required>
                    <input
                      required
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      pattern="[0-9+\-\s]{10,16}"
                      placeholder="10-digit mobile"
                      value={details.phone}
                      onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email (optional)">
                    <input
                      type="email"
                      autoComplete="email"
                      value={details.email}
                      onChange={(e) => setDetails({ ...details, email: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Pet's name" required>
                    <input
                      required
                      value={details.petName}
                      onChange={(e) => setDetails({ ...details, petName: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <fieldset className="sm:col-span-2">
                    <legend className="text-sm font-semibold text-navy">Pet type</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {PET_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          aria-pressed={details.petType === type}
                          onClick={() => setDetails({ ...details, petType: type })}
                          className={`h-10 rounded-full border px-4 text-sm font-semibold transition-colors ${
                            details.petType === type ? "border-teal bg-teal-soft text-teal-dark" : "border-line text-ink hover:border-teal/50"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <Field label="Anything we should know? (optional)" className="sm:col-span-2">
                    <textarea
                      rows={3}
                      maxLength={600}
                      value={details.notes}
                      onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                      className={`${inputClass} h-auto py-3`}
                      placeholder="Symptoms, breed, age, previous treatment…"
                    />
                  </Field>
                </div>
              </StepSection>
            </form>
          )}

          <div className="sticky bottom-0 -mx-5 mt-8 flex items-center justify-between gap-3 border-t border-line bg-white/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => go(step - 1)}
                className="inline-flex h-12 items-center gap-2 rounded-full px-4 font-semibold text-navy hover:bg-cream"
              >
                <ArrowLeft aria-hidden="true" className="size-4" /> Back
              </button>
            ) : (
              <span />
            )}

            {step < 3 ? (
              canContinue && (
                <button
                  type="button"
                  onClick={() => go(step + 1)}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-teal px-7 font-semibold text-white transition-colors hover:bg-teal-dark"
                >
                  Continue <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              )
            ) : (
              <button
                type="submit"
                form="booking-details"
                disabled={submitting}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-teal px-7 font-semibold text-white transition-colors hover:bg-teal-dark disabled:opacity-60"
              >
                {submitting ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Check aria-hidden="true" className="size-4" />}
                Confirm booking
              </button>
            )}
          </div>
        </div>
      </div>

      <Summary clinic={clinic} service={service} date={date} time={time} step={step} />
    </div>
  );
}

const inputClass =
  "mt-2 block h-12 w-full rounded-xl border border-line bg-white px-4 text-[0.97rem] text-ink placeholder:text-muted/60 focus:border-teal focus:ring-4 focus:ring-teal/15 focus:outline-none";

function Field({ label, required, className = "", children }) {
  return (
    <label className={`block text-sm font-semibold text-navy ${className}`}>
      {label} {required && <span className="text-emergency">*</span>}
      {children}
    </label>
  );
}

function Stepper({ step, onJump }) {
  return (
    <ol className="flex border-b border-line px-1.5 sm:px-6">
      {STEPS.map((label, i) => {
        const state = i < step ? "done" : i === step ? "current" : "todo";
        return (
          <li key={label} className="flex-1">
            <button
              type="button"
              onClick={() => onJump(i)}
              disabled={i >= step}
              aria-current={state === "current" ? "step" : undefined}
              className={`flex w-full min-w-0 flex-col items-center gap-1.5 border-b-2 px-0.5 py-3.5 text-[0.65rem] leading-tight font-semibold sm:flex-row sm:justify-center sm:gap-2 sm:py-4 sm:text-sm ${
                state === "current" ? "border-teal text-navy" : state === "done" ? "border-transparent text-teal" : "border-transparent text-muted"
              }`}
            >
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${
                  state === "todo" ? "bg-cream text-muted" : "bg-teal text-white"
                }`}
              >
                {state === "done" ? <Check aria-hidden="true" className="size-3.5" /> : i + 1}
              </span>
              <span className="truncate">{label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function StepSection({ title, hint, children }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-[1.7rem]">{title}</h2>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Choice({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative rounded-2xl border p-4 pr-10 text-left transition-colors ${
        selected ? "border-teal bg-teal-soft/50 ring-1 ring-teal" : "border-line bg-white hover:border-teal/50"
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute top-4 right-4 grid size-5 place-items-center rounded-full border ${
          selected ? "border-teal bg-teal text-white" : "border-line"
        }`}
      >
        {selected && <Check className="size-3" />}
      </span>
    </button>
  );
}

function SlotGroups({ slots, time, onPick }) {
  const groups = [
    { label: "Morning", items: slots.filter((s) => s.time < "12:00") },
    { label: "Afternoon", items: slots.filter((s) => s.time >= "12:00" && s.time < "17:00") },
    { label: "Evening", items: slots.filter((s) => s.time >= "17:00") },
  ].filter((g) => g.items.length);

  return (
    <div className="grid gap-5">
      {groups.map((g) => (
        <div key={g.label}>
          <p className="text-sm font-semibold text-navy">{g.label}</p>
          <div className="mt-2 grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-4 xl:grid-cols-5">
            {g.items.map((s) => (
              <button
                key={s.time}
                type="button"
                disabled={!s.available}
                onClick={() => onPick(s.time)}
                aria-pressed={s.time === time}
                className={`h-11 rounded-xl border text-sm font-semibold transition-colors ${
                  s.time === time
                    ? "border-teal bg-teal text-white"
                    : s.available
                      ? "border-line bg-white text-navy hover:border-teal/60"
                      : "cursor-not-allowed border-line bg-cream text-muted/50 line-through"
                }`}
              >
                {formatTime(s.time)}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Summary({ clinic, service, date, time, step }) {
  const inModal = Boolean(useContext(CloseModalContext));
  const rows = [
    { icon: MapPin, label: "Clinic", value: clinic?.name },
    { icon: Stethoscope, label: "Service", value: service?.name },
    { icon: CalendarDays, label: "Date", value: date && step >= 2 ? formatDate(date) : "" },
    { icon: Clock, label: "Time", value: time ? formatTime(time) : "" },
  ].filter((row) => row.value);

  if (!rows.length) return null;

  return (
    <aside className={`rounded-panel border border-line bg-white p-5 shadow-soft sm:p-6 lg:sticky ${inModal ? "lg:top-0" : "lg:top-28"}`}>
      <h2 className="text-lg">Booking summary</h2>
      <dl className="mt-4 grid gap-3.5">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-teal" />
            <div>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="text-sm font-semibold text-navy">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
      {service?.price && (
        <p className="mt-4 flex justify-between border-t border-line pt-4 text-sm">
          <span className="text-muted">Fee</span> <span className="font-bold text-navy">{service.price}</span>
        </p>
      )}
      {clinic?.phone && (
        <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-muted">
          Emergency? Don&apos;t wait for a slot — call{" "}
          <a href={`tel:${clinic.phone.replace(/[^\d+]/g, "")}`} className="font-semibold text-emergency">
            {clinic.phone}
          </a>
          .
        </p>
      )}
    </aside>
  );
}

function Confirmation({ booking, clinic }) {
  const closeModal = useContext(CloseModalContext);
  const message = `Hello, I booked an appointment online.\nBooking ID: ${booking.ref}\n${booking.serviceName} for ${booking.petName}\n${formatDate(
    booking.date
  )} at ${formatTime(booking.time)}\n${booking.clinicName}`;

  return (
    <div className="mx-auto max-w-xl rounded-panel border border-line bg-white p-6 text-center shadow-soft sm:p-10">
      <CheckCircle2 aria-hidden="true" className="mx-auto size-14 text-teal" strokeWidth={1.5} />
      <h2 className="mt-4 text-3xl">Appointment requested!</h2>
      <p className="mt-2 text-muted">
        Thank you, {booking.ownerName}. Our team will call {booking.phone} to confirm your visit.
      </p>
      <p className="mt-6 inline-block rounded-xl bg-teal-soft px-5 py-2.5 text-sm text-teal-dark">
        Booking ID <span className="ml-1 font-mono text-base font-bold tracking-wider">{booking.ref}</span>
      </p>

      <dl className="mt-6 grid gap-3 rounded-2xl bg-cream p-5 text-left text-sm">
        {[
          [PawPrint, "Pet", booking.petName],
          [Stethoscope, "Service", booking.serviceName],
          [CalendarDays, "When", `${formatDate(booking.date)} · ${formatTime(booking.time)}`],
          [MapPin, "Clinic", clinic?.address ? `${booking.clinicName}, ${clinic.address}` : booking.clinicName],
        ].map(([Icon, label, value]) => (
          <div key={label} className="flex gap-3">
            <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" />
            <dt className="w-16 shrink-0 text-muted">{label}</dt>
            <dd className="font-semibold text-navy">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-white hover:brightness-95"
        >
          <WhatsAppIcon className="size-5" /> Share on WhatsApp
        </a>
        {clinic?.phone && (
          <a
            href={`tel:${clinic.phone.replace(/[^\d+]/g, "")}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-6 font-semibold text-navy hover:bg-cream"
          >
            <Phone aria-hidden="true" className="size-4" /> Call clinic
          </a>
        )}
      </div>
      {closeModal ? (
        <button type="button" onClick={closeModal} className="mt-6 inline-block text-sm font-semibold text-teal hover:text-teal-dark">
          Done
        </button>
      ) : (
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-teal hover:text-teal-dark">
          Back to home
        </Link>
      )}
    </div>
  );
}
