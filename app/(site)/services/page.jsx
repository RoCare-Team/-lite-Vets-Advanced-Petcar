import PageHero from "@/components/ui/PageHero";
import SpecialtyServices from "@/components/SpecialtyServices";
import RegularServices from "@/components/RegularServices";
import EmergencySection from "@/components/EmergencySection";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/ui/JsonLd";
import { services, serviceHref } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Veterinary Services in Gurugram",
  description:
    "Specialty and everyday veterinary services at The Élite Vets, Sector 45 Gurugram — 24/7 emergency & critical care, neurology, cardiology, oncology, surgery, diagnostics, grooming and more.",
  path: "/services",
  image: "/images/service_banner/service_banner_1.webp",
});

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Veterinary services at The Élite Vets Advanced Petcare",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: `${site.url}${serviceHref(s)}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={itemList} />
      <PageHero
        eyebrow="Élite Services"
        title="Complete care, from everyday to emergency"
        description="Ten specialty disciplines and eight regular services — supported by in-house diagnostics and round-the-clock critical care."
        breadcrumbs={[{ name: "Services", href: "/services" }]}
      />
      <SpecialtyServices />
      <RegularServices />
      <EmergencySection />
      <ContactCTA />
    </>
  );
}
