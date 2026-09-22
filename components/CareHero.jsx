import Link from "next/link";
import { ArrowRight, CalendarCheck, CheckCircle2, Clock, PhoneCall } from "lucide-react";
import Button from "./ui/Button";
import CmsImage from "./ui/CmsImage";
import { site } from "@/lib/site";
import { addDays, clinicNow, formatDate, formatTime } from "@/lib/slots";

// Homepage hero: service tiles on the left, photo mosaic on the right.
// Everything comes from the admin-editable content (Admin → Homepage).
// Wrap words in *asterisks* in the heading to colour them teal.
export default function CareHero({ hero, nextSlot, hours }) {
  const [b1, b2, b3] = hero.banners || [];

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-cream pt-8 pb-12 lg:pt-12 lg:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-teal-soft/70 blur-3xl"
      />

      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="max-w-2xl">
            <h1 id="hero-heading" className="text-[2.1rem] leading-[1.1] text-navy sm:text-[2.6rem] lg:text-[3.1rem]" data-reveal>
              <Accent text={hero.title} />
            </h1>
            {hero.subtitle && (
              <p className="mt-3 text-[0.97rem] leading-relaxed text-muted sm:text-base" data-reveal>
                {hero.subtitle}
              </p>
            )}
          </div>
          {hours && <OpenChip hours={hours} />}
        </div>

        <div className="mt-7 grid gap-6 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-8 xl:gap-10">
          {/* Service tiles */}
          <div className="flex flex-col gap-5" data-reveal>
            <div className="rounded-panel border border-line bg-white p-4 shadow-soft sm:p-7">
              <ul className="grid grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-7">
                {hero.tiles.map((tile) => (
                  <li key={tile.id}>
                    <Link href={tile.href || "/book"} className="group flex flex-col items-center text-center outline-offset-4">
                      <span className="relative block aspect-square w-full max-w-[8.5rem] transition-transform duration-300 group-hover:-translate-y-1">
                        <span className="absolute inset-0 overflow-hidden rounded-[1.1rem] bg-teal-soft/60 ring-1 ring-navy/5 transition-shadow duration-300 group-hover:shadow-lift group-hover:ring-teal/30">
                          <CmsImage
                            src={tile.image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 140px, 30vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                          />
                          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-navy/15 to-transparent" />
                        </span>
                        {tile.badge && (
                          <span className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2 rounded-md bg-white px-2 py-0.5 text-[0.68rem] font-bold whitespace-nowrap text-teal-dark shadow-soft ring-1 ring-teal/20">
                            {tile.badge}
                          </span>
                        )}
                      </span>
                      <span className="mt-2.5 text-[0.8rem] leading-tight font-bold text-navy transition-colors group-hover:text-teal sm:text-[0.95rem]">
                        {tile.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/book" size="lg" className="w-full sm:w-auto">
                <CalendarCheck aria-hidden="true" className="size-5" />
                {hero.ctaLabel || "Book an Appointment"}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
              <Button href={site.phone.primaryHref} variant="emergency-outline" size="lg" className="w-full sm:w-auto">
                <PhoneCall aria-hidden="true" className="size-5" /> 24/7 Emergency
              </Button>
            </div>

            {hero.highlights?.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.85rem] text-ink">
                {hero.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-1.5">
                    <CheckCircle2 aria-hidden="true" className="size-4 text-teal" /> {h}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Photo mosaic */}
          <div className="grid min-h-[340px] grid-cols-2 grid-rows-[2fr_3fr] gap-3 sm:min-h-[480px] sm:gap-4" data-reveal>
            <Banner banner={b1} className="hidden sm:block" />
            <Banner banner={b2} className="hidden sm:block" />
            <Banner banner={b3} priority className="col-span-2 row-span-2 sm:row-span-1">
              {nextSlot && <NextSlotCard slot={nextSlot} />}
            </Banner>
          </div>
        </div>
      </div>
    </section>
  );
}

function Accent({ text }) {
  return text.split(/\*(.+?)\*/).map((part, i) => (i % 2 ? <span key={i} className="text-teal">{part}</span> : part));
}

function OpenChip({ hours }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-ink shadow-soft ring-1 ring-line" data-reveal>
      <span className="relative flex size-2.5">
        {!hours.closed && <span className="absolute inset-0 animate-ping rounded-full bg-teal/60" />}
        <span className={`relative size-2.5 rounded-full ${hours.closed ? "bg-muted/50" : "bg-teal"}`} />
      </span>
      {hours.closed ? (
        "Clinic closed today · 24/7 emergency line open"
      ) : (
        <span>
          <span className="font-semibold text-navy">Open today</span> · {formatTime(hours.open)} – {formatTime(hours.close)}
        </span>
      )}
    </p>
  );
}

function NextSlotCard({ slot }) {
  const today = clinicNow().date;
  const day = slot.date === today ? "Today" : slot.date === addDays(today, 1) ? "Tomorrow" : formatDate(slot.date, { year: false });
  return (
    <Link
      href={`/book?clinic=${slot.clinicId}`}
      className="group absolute bottom-3 left-3 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-4 shadow-float ring-1 ring-navy/5 backdrop-blur transition-transform hover:-translate-y-0.5 sm:bottom-5 sm:left-5"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-soft text-teal">
        <Clock aria-hidden="true" className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-xs text-muted">Next available slot</span>
        <span className="block text-sm font-bold text-navy">
          {day}, {formatTime(slot.time)}
        </span>
      </span>
      <ArrowRight aria-hidden="true" className="ml-1 size-4 text-teal transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function Banner({ banner, className = "", priority = false, children }) {
  return (
    <div className={`relative overflow-hidden rounded-card bg-teal-soft ${className}`}>
      {banner?.image && (
        <CmsImage
          src={banner.image}
          alt={banner.alt || ""}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: banner.position || "center 30%" }}
        />
      )}
      {banner?.caption && (
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-soft backdrop-blur">
          {banner.caption}
        </span>
      )}
      {children}
    </div>
  );
}
