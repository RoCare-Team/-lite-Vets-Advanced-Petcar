import { CalendarCheck, Phone, Siren } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import LocationSection from "@/components/LocationSection";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact & Book an Appointment",
  description:
    "Contact The Élite Vets Advanced Petcare, DSS 107 & 108 Huda Market, Sector 45 Gurugram. Call +91 92663 95550 or 0124-4141348, email theelitevets@gmail.com, or book an appointment online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Book an appointment or get in touch"
        description="We're here 24/7 for emergencies. For consultations, book online and our team will confirm your visit."
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={site.phone.primaryHref} variant="emergency" size="lg" className="w-full sm:w-auto">
            <Siren aria-hidden="true" className="size-5" /> Emergency: {site.phone.primary}
          </Button>
          <Button href={site.phone.landlineHref} variant="ghost-light" size="lg" className="w-full sm:w-auto">
            <Phone aria-hidden="true" className="size-5" /> {site.phone.landline}
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="appointment-heading" className="bg-cream pt-16 lg:pt-24">
        <div className="container-x">
          <div className="rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10 lg:p-12">
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-teal/60" /> Online booking
            </p>
            <h2 id="appointment-heading" className="mt-4 text-3xl font-bold sm:text-4xl">
              Book an appointment
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Choose your clinic, service, date and time slot — it takes under a minute, and our team will call to
              confirm.
            </p>
            <Button href="/book" size="lg" className="mt-8 w-full sm:w-auto">
              <CalendarCheck aria-hidden="true" className="size-5" /> Book an appointment
            </Button>
          </div>
        </div>
      </section>

      <LocationSection showHeading={false} />
    </>
  );
}
