import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarCheck, Phone, Check, Siren, Clock, ArrowRight, MapPin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import ServiceCard from "@/components/ServiceCard";
import ContactCTA from "@/components/ContactCTA";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { services, getService, serviceHref, specialtyServices, regularServices } from "@/data/services";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: serviceHref(service),
    image: service.banner,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = serviceHref(service);
  const isSpecialty = service.category === "specialty";
  const siblings = (isSpecialty ? specialtyServices : regularServices).filter((s) => s.slug !== service.slug);
  const related = siblings.slice(0, 3);
  const bookLink = whatsappLink(`Hello, I would like to book an appointment for ${service.name} at The Élite Vets.`);
  const Icon = service.icon;

  return (
    <>
      <JsonLd data={serviceSchema(service, path)} />
      <PageHero
        eyebrow={isSpecialty ? "Specialty Service" : "Regular Service"}
        title={service.name}
        description={service.headline}
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: service.cardName, href: path },
        ]}
        image={{ src: service.banner, alt: service.alt }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={bookLink} size="lg" className="w-full sm:w-auto">
            <CalendarCheck aria-hidden="true" className="size-5" /> Book an Appointment
          </Button>
          <Button
            href={site.phone.primaryHref}
            variant={service.featured ? "emergency" : "ghost-light"}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Phone aria-hidden="true" className="size-5" /> {service.featured ? "Call Emergency Team" : site.phone.primary}
          </Button>
        </div>
      </PageHero>

      <section className="section-y bg-cream">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <article>
            <span className="grid size-14 place-items-center rounded-2xl bg-teal-soft text-teal" data-reveal>
              <Icon aria-hidden="true" className="size-7" strokeWidth={1.75} />
            </span>
            <h2 className="mt-6 text-3xl leading-tight font-bold sm:text-4xl" data-reveal>
              {service.headline}
            </h2>
            <div className="mt-6 space-y-5 text-[1.05rem] leading-[1.8] text-ink/85" data-reveal>
              {service.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {service.highlights && (
              <div className="mt-10 rounded-card border border-line bg-white p-6 sm:p-8" data-reveal>
                <h3 className="text-lg font-semibold">{service.highlightsTitle ?? "What's included"}</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[0.97rem] text-ink">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                        <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.closing && (
              <p
                className="mt-10 border-l-4 border-teal pl-5 text-xl leading-snug font-semibold text-navy sm:text-2xl"
                data-reveal
              >
                {service.closing}
              </p>
            )}

            <p className="mt-10 flex items-center gap-2 text-sm text-muted">
              <MapPin aria-hidden="true" className="size-4 text-teal" />
              The Élite Vets Advanced Petcare offers {service.cardName.toLowerCase()} services in Gurugram.
            </p>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Book and contact">
            <div className="rounded-card bg-navy p-7 text-white">
              <p className="text-lg font-semibold">Does your pet need help?</p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Book a visit with our veterinary team, or call us any time.
              </p>
              <div className="mt-6 grid gap-2.5">
                <Button href={bookLink} className="w-full">
                  <CalendarCheck aria-hidden="true" className="size-4" /> Book Appointment
                </Button>
                <Button href={whatsappLink(`Hello, I have a question about ${service.name}.`)} variant="ghost-light" className="w-full">
                  <WhatsAppIcon className="size-4" /> Ask on WhatsApp
                </Button>
              </div>
              <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
                <a href={site.phone.primaryHref} className="flex items-center gap-2.5 font-semibold hover:text-teal-soft">
                  <Phone aria-hidden="true" className="size-4 text-teal-soft" /> {site.phone.primary}
                </a>
                <a href={site.phone.landlineHref} className="flex items-center gap-2.5 font-semibold hover:text-teal-soft">
                  <Phone aria-hidden="true" className="size-4 text-teal-soft" /> {site.phone.landline}
                </a>
                <p className="flex items-center gap-2.5 text-white/60">
                  <Clock aria-hidden="true" className="size-4 text-teal-soft" /> Open 24/7
                </p>
              </div>
            </div>

            {!service.featured && (
              <Link
                href="/24-7-emergency-critical-care-and-hospitalization"
                className="flex items-center gap-4 rounded-card border border-emergency/20 bg-white p-5 transition-colors hover:border-emergency/50"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emergency/10 text-emergency">
                  <Siren aria-hidden="true" className="size-5" />
                </span>
                <span className="text-sm leading-snug">
                  <span className="block font-semibold text-navy">24/7 Emergency &amp; Critical Care</span>
                  <span className="text-muted">Always here when your pet needs us</span>
                </span>
              </Link>
            )}

            <nav aria-label={isSpecialty ? "Other specialty services" : "Other regular services"} className="rounded-card border border-line bg-white p-6">
              <p className="eyebrow">{isSpecialty ? "Specialty Services" : "Regular Services"}</p>
              <ul className="mt-4 grid gap-0.5">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={serviceHref(s)}
                      className="group flex items-center justify-between rounded-lg px-2 py-2 text-[0.93rem] text-ink transition-colors hover:bg-cream hover:text-navy"
                    >
                      {s.cardName}
                      <ArrowRight aria-hidden="true" className="size-4 text-muted/40 transition-all group-hover:translate-x-0.5 group-hover:text-teal" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      <section aria-labelledby="related-heading" className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 id="related-heading" className="text-2xl font-bold sm:text-3xl">
              Related services
            </h2>
            <Link href="/services" className="hidden items-center gap-1.5 text-sm font-semibold text-teal sm:inline-flex">
              All services <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug} data-reveal>
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
