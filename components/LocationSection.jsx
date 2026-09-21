import { MapPin, Phone, Mail, Clock, Navigation, Siren } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { site, whatsappLink } from "@/lib/site";

export default function LocationSection({ headingLevel = "h2", showHeading = true }) {
  const rows = [
    {
      icon: MapPin,
      label: "Address",
      content: (
        <address className="not-italic">
          {site.address.line1}
          <br />
          {site.address.line2}, {site.address.city}
        </address>
      ),
    },
    {
      icon: Phone,
      label: "Phone",
      content: (
        <span className="flex flex-col">
          <a href={site.phone.primaryHref} className="w-fit hover:text-teal">
            {site.phone.primary}
          </a>
          <a href={site.phone.landlineHref} className="w-fit hover:text-teal">
            {site.phone.landline}
          </a>
        </span>
      ),
    },
    {
      icon: Mail,
      label: "Email",
      content: (
        <a href={`mailto:${site.email}`} className="break-all hover:text-teal">
          {site.email}
        </a>
      ),
    },
    {
      icon: Clock,
      label: "Hours",
      content: <span>Open 24 hours, 7 days a week — emergency, critical care &amp; hospitalization</span>,
    },
  ];

  return (
    <section id="location" aria-labelledby="location-heading" className="section-y bg-white">
      <div className="container-x">
        {showHeading && (
          <SectionHeading
            id="location-heading"
            as={headingLevel}
            eyebrow="Visit Us"
            title="Find us in Sector 45, Gurugram"
            description="Conveniently located in Huda Market — call ahead in an emergency so our team is ready for you."
          />
        )}

        <div className={`grid gap-5 lg:grid-cols-[0.9fr_1.1fr] ${showHeading ? "mt-12 lg:mt-14" : ""}`}>
          <div className="flex flex-col rounded-panel border border-line bg-cream p-6 sm:p-9" data-reveal>
            {!showHeading && (
              <h2 id="location-heading" className="mb-6 text-2xl font-bold">
                Contact details
              </h2>
            )}
            <dl className="grid gap-6">
              {rows.map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-teal shadow-sm">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs font-bold tracking-[0.14em] text-muted uppercase">{label}</dt>
                    <dd className="mt-1 text-[0.97rem] leading-relaxed font-medium text-navy">{content}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-emergency/8 p-4 text-sm text-ink ring-1 ring-emergency/15">
              <Siren aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-emergency" />
              <p>
                <span className="font-semibold text-navy">In an emergency?</span> Call{" "}
                <a href={site.phone.primaryHref} className="font-semibold text-emergency underline-offset-2 hover:underline">
                  {site.phone.primary}
                </a>{" "}
                on your way so we can prepare.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-auto lg:pt-8">
              <Button href={site.phone.primaryHref} variant="dark" className="w-full">
                <Phone aria-hidden="true" className="size-4" /> Call now
              </Button>
              <Button href={whatsappLink()} variant="outline" className="w-full">
                <WhatsAppIcon className="size-4 text-[#25D366]" /> WhatsApp
              </Button>
            </div>
          </div>

          <div
            className="relative min-h-[22rem] overflow-hidden rounded-panel border border-line bg-teal-soft sm:min-h-[28rem]"
            data-reveal
          >
            <iframe
              title="Map showing The Élite Vets Advanced Petcare, Huda Market, Sector 45, Gurugram"
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 grayscale-[35%]"
            />
            <div className="absolute inset-x-4 bottom-4 flex flex-col gap-4 rounded-2xl bg-white/95 p-5 shadow-float backdrop-blur sm:inset-x-auto sm:right-5 sm:bottom-5 sm:left-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal text-white">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <span className="leading-tight">
                  <span className="block font-semibold text-navy">{site.shortName}</span>
                  <span className="block text-sm text-muted">Huda Market, Sector 45, Gurugram</span>
                </span>
              </div>
              <Button href={site.mapsUrl} size="sm" className="w-full sm:w-auto">
                <Navigation aria-hidden="true" className="size-4" /> Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
