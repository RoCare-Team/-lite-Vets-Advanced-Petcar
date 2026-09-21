import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import ContactCTA from "@/components/ContactCTA";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/data/images";

export const metadata = pageMetadata({
  title: "Pet Care Gallery – Moments From Our Hospital",
  description:
    "Photos from The Élite Vets Advanced Petcare, Gurugram — our hospital, operation theatre, wards, grooming room, pharmacy and the patients we care for.",
  path: "/gallery",
  image: images.receptionWide.src,
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Élite Gallery"
        title="Life at The Élite Vets"
        description="A look inside our hospital — the spaces, the care and the patients who make every day worthwhile."
        breadcrumbs={[{ name: "Gallery", href: "/gallery" }]}
      />
      <section aria-label="Photo gallery" className="section-y bg-cream">
        <div className="container-x">
          <GalleryGrid />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
