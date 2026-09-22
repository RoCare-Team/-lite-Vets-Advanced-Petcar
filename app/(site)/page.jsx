import { connection } from "next/server";
import CareHero from "@/components/CareHero";
import Stats from "@/components/Stats";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import EmergencySection from "@/components/EmergencySection";
import TeamStrip from "@/components/TeamStrip";
import BloodDonation from "@/components/BloodDonation";
import Testimonials from "@/components/Testimonials";
import GalleryPreview from "@/components/GalleryPreview";
import BookingBand from "@/components/BookingBand";
import { getContent } from "@/lib/store";
import { nextAvailableSlot, todayHours } from "@/lib/availability";

export default async function HomePage() {
  await connection(); // content is edited live from /admin
  const [{ hero }, nextSlot, hours] = await Promise.all([getContent(), nextAvailableSlot(), todayHours()]);

  return (
    <>
      <CareHero hero={hero} nextSlot={nextSlot} hours={hours} />
      <Stats />
      <ServicesGrid />
      <AboutSection />
      <EmergencySection />
      <TeamStrip />

      <section aria-label="Blood donation and reviews" className="bg-white py-12 lg:py-14">
        <div className="container-x grid gap-4 lg:grid-cols-[1.75fr_1fr]">
          <BloodDonation />
          <Testimonials />
        </div>
      </section>

      <GalleryPreview />
      <BookingBand />
    </>
  );
}
