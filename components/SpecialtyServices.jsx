import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Siren } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import ServiceCard from "./ServiceCard";
import { specialtyServices, serviceHref } from "@/data/services";
import { site } from "@/lib/site";
import { images } from "@/data/images";

export default function SpecialtyServices({ headingLevel = "h2" }) {
  const featured = specialtyServices.find((s) => s.featured);
  const rest = specialtyServices.filter((s) => !s.featured);

  return (
    <section id="specialty-services" aria-labelledby="specialty-heading" className="section-y bg-cream">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="specialty-heading"
            as={headingLevel}
            eyebrow="Specialty Services"
            title="Specialised Care for Complex Needs"
            description="Advanced, specialist-led care across ten disciplines — backed by in-house diagnostics and round-the-clock critical care."
          />
          <Button href="/services" variant="outline" className="hidden shrink-0 lg:inline-flex">
            All services <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {/* Featured: Emergency */}
          <article
            data-reveal
            className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-card bg-navy p-7 text-white shadow-lift sm:col-span-2 sm:p-9"
          >
            <Image
              src={images.criticalCare.src}
              alt={images.criticalCare.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="-z-10 object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy-deep via-navy-deep/75 to-navy-deep/10" />

            <span className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-emergency px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase sm:top-8 sm:left-9">
              <Siren aria-hidden="true" className="size-3.5" /> Open 24/7
            </span>

            <h3 className="max-w-md text-2xl leading-tight font-bold text-white sm:text-3xl">
              <Link href={serviceHref(featured)} className="rounded after:absolute after:inset-0 after:content-['']">
                Emergency, Critical Care &amp; Hospitalization
              </Link>
            </h3>
            <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/75">{featured.summary}</p>
            <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-soft">
                Explore Service <ArrowRight aria-hidden="true" className="size-4" />
              </span>
              <a
                href={site.phone.primaryHref}
                className="ml-auto inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20"
              >
                <Phone aria-hidden="true" className="size-4" /> {site.phone.primary}
              </a>
            </div>
          </article>

          {/* Mobile: horizontal scroller · sm+: grid items */}
          <ul
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:contents"
            aria-label="Specialty services"
          >
            {rest.map((service, i) => (
              <li
                key={service.slug}
                data-reveal
                style={{ "--reveal-delay": `${(i % 4) * 60}ms` }}
                className="w-[78%] shrink-0 snap-start sm:w-auto"
              >
                <ServiceCard service={service} />
              </li>
            ))}
            <li className="hidden sm:block" data-reveal>
              <Link
                href="/services"
                className="group flex h-full min-h-64 flex-col justify-between rounded-card bg-teal p-7 text-white transition-colors hover:bg-teal-dark"
              >
                <span className="text-sm font-semibold tracking-[0.16em] text-white/70 uppercase">18 services</span>
                <span>
                  <span className="block text-2xl leading-tight font-bold">Explore every service we offer</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                    View all services
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <Button href="/services" variant="outline" className="mt-8 w-full sm:hidden">
          View all services <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </section>
  );
}
