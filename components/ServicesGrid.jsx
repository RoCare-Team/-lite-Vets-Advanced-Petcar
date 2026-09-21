import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services, serviceHref } from "@/data/services";

// Compact icon grid of all 18 services (specialty first, emergency featured).
export default function ServicesGrid() {
  return (
    <section aria-labelledby="services-heading" className="bg-cream py-12 lg:py-14">
      <div className="container-x">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal>
            <p className="eyebrow">Our Services</p>
            <h2 id="services-heading" className="mt-2 text-[1.9rem] leading-tight sm:text-[2.2rem]">
              Specialized Care for Every Pet
            </h2>
            <p className="mt-1.5 text-sm text-muted sm:text-[0.95rem]">
              Ten specialty disciplines and eight everyday services — with in-house diagnostics and 24/7 critical care.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark"
          >
            View All Services <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <ul className="mt-7 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 lg:gap-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.slug} data-reveal style={{ "--reveal-delay": `${(i % 9) * 35}ms` }}>
                <Link
                  href={serviceHref(s)}
                  className={`group flex h-full min-h-[6.75rem] flex-col items-center justify-center gap-2.5 rounded-2xl border px-2 py-4 text-center transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:shadow-soft ${
                    s.featured
                      ? "border-emergency/25 bg-emergency/7 text-emergency hover:border-emergency/50"
                      : "border-line bg-white text-navy hover:border-teal/40"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`size-7 transition-colors ${s.featured ? "" : "text-navy group-hover:text-teal"}`}
                    strokeWidth={1.4}
                  />
                  <span className={`text-[0.74rem] leading-snug font-semibold sm:text-[0.78rem] ${s.featured ? "" : "text-ink"}`}>
                    {s.cardName}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
