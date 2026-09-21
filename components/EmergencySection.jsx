import Image from "next/image";
import Link from "next/link";
import { Clock, HeartPulse, BedDouble, ScanSearch, PhoneCall, ArrowRight, Siren } from "lucide-react";
import Button from "./ui/Button";
import { images } from "@/data/images";
import { site } from "@/lib/site";

// Based on the existing "24/7 Emergency, Critical Care and Hospitalization" page.
const features = [
  { icon: Clock, title: "24/7 Emergency", text: "Immediate attention, day and night" },
  { icon: HeartPulse, title: "Critical Care", text: "Dedicated ICU and trained staff" },
  { icon: BedDouble, title: "Hospitalization", text: "Round-the-clock supervision" },
  { icon: ScanSearch, title: "Advanced Diagnostics", text: "To stabilise and treat quickly" },
];

export default function EmergencySection({ className = "bg-white pb-14 lg:pb-20" }) {
  return (
    <section aria-labelledby="emergency-heading" className={className}>
      <div className="container-x">
        <div className="grid overflow-hidden rounded-3xl bg-navy text-white shadow-lift lg:grid-cols-[0.9fr_1.1fr]" data-reveal>
          <div className="relative min-h-64 sm:min-h-80">
            <Image
              src={images.emergencyBand.src}
              alt={images.emergencyBand.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[40%_center]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent" />
            <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-emergency px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase shadow-float">
              <Siren aria-hidden="true" className="size-3.5" /> Open 24/7
            </span>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <p className="eyebrow text-[#f08a8a]!">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emergency opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emergency" />
              </span>
              Pet Emergency Care
            </p>
            <h2 id="emergency-heading" className="mt-3 text-[2rem] leading-tight text-white sm:text-[2.5rem]">
              When Every Second Matters
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/70">
              Our experienced veterinarians and trained staff are always ready to deliver life-saving treatment and
              continuous monitoring — with round-the-clock hospitalization for recovery.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/8 text-[#f08a8a] ring-1 ring-white/10">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="leading-snug">
                    <span className="block text-[0.9rem] font-semibold">{title}</span>
                    <span className="block text-[0.8rem] text-white/55">{text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={site.phone.primaryHref} variant="emergency" className="w-full sm:w-auto">
                <PhoneCall aria-hidden="true" className="size-4" /> Call Now: {site.phone.primary}
              </Button>
              <Link
                href="/24-7-emergency-critical-care-and-hospitalization"
                className="inline-flex h-12 items-center justify-center gap-1.5 px-2 text-sm font-semibold text-teal-soft hover:text-white"
              >
                About emergency care <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
