import Link from "next/link";
import { ArrowRight, Clock, PawPrint } from "lucide-react";
import CmsImage from "./ui/CmsImage";
import { tileIcons, tileColors } from "@/data/tile-icons";
import { addDays, clinicNow, formatDate, formatTime } from "@/lib/slots";

// Homepage hero: headline and service tiles on the left, photo mosaic on the
// right, sized to fit the first screen. Booking happens through the tiles and
// the next-slot card. Everything comes from the admin panel (Admin → Homepage).
export default function CareHero({ hero, nextSlot, hours }) {
  const [b1, b2, b3] = hero.banners || [];

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-cream pt-4 pb-7 lg:pt-5 lg:pb-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-teal-soft/70 blur-3xl"
      />

      <div className="container-x relative">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 xl:gap-10">
          {/* Headline and service tiles */}
          <div className="flex flex-col gap-3.5" data-reveal>
            {hours && <OpenChip hours={hours} />}

            <div>
              <h1 id="hero-heading" className="text-[1.9rem] leading-[1.12] text-navy sm:text-[2.2rem] lg:text-[2.35rem]">
                <Accent text={hero.title} />
              </h1>
              {hero.subtitle && (
                <p className="mt-2 max-w-lg text-[0.9rem] leading-relaxed text-muted sm:text-[0.95rem]">{hero.subtitle}</p>
              )}
            </div>

            <div className="rounded-panel border border-line bg-white p-3.5 shadow-soft">
              <ul className="grid grid-cols-3 items-start gap-x-2 gap-y-3">
                {hero.tiles.map((tile) => (
                  <li key={tile.id}>
                    <TileLink tile={tile} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Photo mosaic — tall portrait beside two smaller shots */}
          <div
            className="grid min-h-[280px] grid-cols-5 grid-rows-2 gap-2.5 sm:min-h-[420px] sm:gap-3.5 lg:min-h-0"
            data-reveal
          >
            <Banner banner={b3} priority scrim className="col-span-3 row-span-2">
              {nextSlot && <NextSlotCard slot={nextSlot} />}
            </Banner>
            <Banner banner={b1} className="col-span-2" />
            <Banner banner={b2} className="col-span-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

// A tile shows its icon; an uploaded image is used instead when one is set.
function TileLink({ tile }) {
  const Icon = tileIcons[tile.icon] || PawPrint;
  const { soft, ink } = tileColors[tile.color] || tileColors.blue;
  return (
    <Link href={tile.href || "/book"} className="group flex flex-col items-center text-center outline-offset-4">
      <span
        className="relative mx-auto grid aspect-square w-full max-w-[4.7rem] place-items-center overflow-hidden rounded-[1.15rem] ring-1 ring-navy/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift"
        style={{ backgroundImage: `linear-gradient(to bottom, ${soft}, color-mix(in srgb, ${soft} 45%, white))` }}
      >
        {tile.image ? (
          <CmsImage src={tile.image} alt="" fill sizes="100px" className="object-cover" />
        ) : (
          <Icon
            aria-hidden="true"
            className="size-[45%] transition-transform duration-300 group-hover:scale-110"
            style={{ color: ink }}
            strokeWidth={1.5}
          />
        )}
        {tile.badge && (
          <span
            className="absolute top-1.5 left-1/2 z-10 -translate-x-1/2 rounded-md bg-white px-1.5 py-0.5 text-[0.62rem] font-bold whitespace-nowrap shadow-soft ring-1 ring-navy/5"
            style={{ color: ink }}
          >
            {tile.badge}
          </span>
        )}
      </span>
      <span className="mt-1.5 flex min-h-[1.7rem] items-start justify-center text-[0.78rem] leading-tight font-bold text-navy transition-colors group-hover:text-teal sm:text-[0.86rem]">
        {tile.label}
      </span>
    </Link>
  );
}

function Accent({ text }) {
  return text.split(/\*(.+?)\*/).map((part, i) => (i % 2 ? <span key={i} className="text-teal">{part}</span> : part));
}

function OpenChip({ hours }) {
  return (
    <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[0.82rem] text-ink shadow-soft ring-1 ring-line">
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
      className="group absolute bottom-3 left-3 flex items-center gap-2.5 rounded-2xl bg-white/95 p-2.5 pr-3.5 shadow-float ring-1 ring-navy/5 backdrop-blur transition-transform hover:-translate-y-0.5 sm:bottom-4 sm:left-4"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-teal-soft text-teal">
        <Clock aria-hidden="true" className="size-[1.1rem]" />
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

const FOCUS = { top: "center 22%", center: "center 50%", bottom: "center 78%" };

function Banner({ banner, className = "", priority = false, scrim = false, children }) {
  return (
    <div
      className={`group/banner relative overflow-hidden rounded-[1.4rem] bg-teal-soft shadow-soft ring-1 ring-navy/5 ${className}`}
    >
      {banner?.image && (
        <CmsImage
          src={banner.image}
          alt={banner.alt || ""}
          fill
          priority={priority}
          sizes={scrim ? "(min-width: 1024px) 32vw, 60vw" : "(min-width: 1024px) 22vw, 40vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover/banner:scale-[1.04]"
          style={{ objectPosition: FOCUS[banner.focus] || FOCUS.center }}
        />
      )}
      {scrim && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-navy/45 to-transparent" />
      )}
      {banner?.caption && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1 text-[0.72rem] font-semibold text-navy shadow-soft ring-1 ring-navy/5 backdrop-blur">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
          {banner.caption}
        </span>
      )}
      {children}
    </div>
  );
}
