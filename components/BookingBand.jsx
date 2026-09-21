import { CalendarCheck, PawPrint, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import { bookingLink, site } from "@/lib/site";

// Slim contact + booking band that closes the homepage.
export default function BookingBand() {
  const item = "flex items-start gap-3 text-[0.82rem] leading-snug text-ink";
  const icon = "mt-0.5 size-5 shrink-0 text-teal";

  return (
    <section aria-labelledby="booking-heading" className="border-y border-teal/10 bg-teal-soft/60">
      <div className="container-x grid gap-6 py-7 md:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_1fr_1.6fr_auto] lg:items-center lg:gap-7">
        <div className="flex items-center gap-3">
          <PawPrint aria-hidden="true" className="size-9 shrink-0 text-teal" strokeWidth={1.5} />
          <div>
            <h2 id="booking-heading" className="text-xl leading-tight sm:text-[1.3rem]">
              Book an Appointment Today
            </h2>
            <p className="text-xs text-muted">Give your pet the care they deserve.</p>
          </div>
        </div>

        <p className={item}>
          <Phone aria-hidden="true" className={icon} />
          <span>
            <a href={site.phone.primaryHref} className="block font-semibold hover:text-teal">
              {site.phone.primary}
            </a>
            <a href={site.phone.landlineHref} className="block hover:text-teal">
              {site.phone.landline}
            </a>
          </span>
        </p>

        <p className={item}>
          <Mail aria-hidden="true" className={icon} />
          <a href={`mailto:${site.email}`} className="self-center font-semibold break-all hover:text-teal">
            {site.email}
          </a>
        </p>

        <p className={item}>
          <MapPin aria-hidden="true" className={icon} />
          <span>
            {site.address.line1}
            <br />
            {site.address.line2}, {site.address.city} ·{" "}
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-semibold text-teal hover:text-teal-dark">
              Directions <ArrowRight aria-hidden="true" className="size-3.5" />
            </a>
          </span>
        </p>

        <Button href={bookingLink} className="w-full md:col-span-2 lg:col-span-1 lg:w-auto">
          <CalendarCheck aria-hidden="true" className="size-4" /> Book Appointment
        </Button>
      </div>
    </section>
  );
}
