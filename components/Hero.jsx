import Image from "next/image";
import { ArrowRight, CalendarCheck, PhoneCall, Clock, UsersRound, Stethoscope, Microscope, HeartHandshake } from "lucide-react";
import Button from "./ui/Button";
import { images } from "@/data/images";
import { bookingLink, site } from "@/lib/site";

const trust = [
  { icon: Stethoscope, label: "Experienced Team" },
  { icon: Microscope, label: "Advanced Diagnostics" },
  { icon: HeartHandshake, label: "Compassionate Care" },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-cream">
      <div className="grid lg:min-h-[540px] lg:grid-cols-[1fr_1.05fr] xl:min-h-[560px]">
        {/* Copy — aligned to the site container on the left */}
        <div className="relative z-10 flex flex-col justify-center px-(--pad) pt-10 pb-10 lg:py-14 lg:pr-10 lg:pl-(--edge)">
          <p className="eyebrow" data-reveal>
            Advanced Petcare <span aria-hidden="true">•</span> Gurugram
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-[2.35rem] leading-[1.08] text-navy sm:text-5xl lg:text-[3.1rem] xl:text-[3.45rem]"
            data-reveal
            style={{ "--reveal-delay": "60ms" }}
          >
            Advanced Veterinary Care. <span className="text-teal">Compassionate</span> by&nbsp;Nature.
          </h1>
          <p
            className="mt-5 max-w-lg text-[0.97rem] leading-relaxed text-muted sm:text-base"
            data-reveal
            style={{ "--reveal-delay": "120ms" }}
          >
            Expert veterinary care, advanced diagnostics and specialised treatment for dogs, cats and exotic companions —
            with compassionate support for every pet parent.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row" data-reveal style={{ "--reveal-delay": "180ms" }}>
            <Button href={bookingLink} size="lg" className="w-full sm:w-auto">
              <CalendarCheck aria-hidden="true" className="size-5" />
              Book an Appointment
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
            <Button href={site.phone.primaryHref} variant="emergency" size="lg" className="w-full sm:w-auto">
              <PhoneCall aria-hidden="true" className="size-5" />
              24/7 Emergency
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8rem] text-ink" data-reveal style={{ "--reveal-delay": "240ms" }}>
            {trust.map(({ icon: Icon, label }, i) => (
              <li key={label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="mr-3 hidden h-4 w-px bg-line sm:block" />}
                <Icon aria-hidden="true" className="size-4 text-emergency" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual — bleeds to the right edge */}
        <div className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-0" data-reveal>
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            quality={85}
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover object-[45%_center]"
          />
          {/* Soft blend into the copy column */}
          <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-40 bg-linear-to-r from-cream to-transparent lg:block" />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy/25 via-transparent to-transparent lg:hidden" />

          <p
            aria-hidden="true"
            className="absolute top-8 left-10 hidden -rotate-6 font-script text-4xl leading-none text-navy/70 xl:block"
          >
            Cure &amp; Care
            <br />
            <span className="pl-6">with Compassion</span>
          </p>

          <div className="absolute right-4 bottom-4 left-4 grid gap-3 sm:left-auto sm:w-60 lg:top-1/2 lg:right-(--edge) lg:bottom-auto lg:-translate-y-1/2">
            <FloatCard icon={Clock} tone="emergency" title="24/7 Emergency Care" text="Always here when your pet needs us." />
            <FloatCard
              icon={UsersRound}
              title="Experienced Veterinary Team"
              text="Led by Head Vet Dr. Raghubir S Mehla."
              className="hidden sm:flex"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatCard({ icon: Icon, title, text, tone = "teal", className = "" }) {
  return (
    <div className={`flex items-start gap-3 rounded-2xl bg-white/95 p-4 shadow-float ring-1 ring-navy/5 backdrop-blur ${className}`}>
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-xl ${
          tone === "emergency" ? "bg-emergency/10 text-emergency" : "bg-teal-soft text-teal"
        }`}
      >
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold text-navy">{title}</span>
        <span className="mt-1 block text-xs leading-snug text-muted">{text}</span>
      </span>
    </div>
  );
}
