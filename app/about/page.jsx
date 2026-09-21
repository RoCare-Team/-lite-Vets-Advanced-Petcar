import Image from "next/image";
import { Target, Eye } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";
import TeamSection from "@/components/TeamSection";
import ContactCTA from "@/components/ContactCTA";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us – Expert Veterinary Care in Gurugram",
  description:
    "About The Élite Vets Advanced Petcare, Sector 45 Gurugram — compassionate, expert veterinary care with advanced diagnostics, personalised treatment and open communication with pet parents.",
  path: "/about",
  image: images.receptionWide.src,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Caring for Your Pets, The Élite Way"
        description="Compassionate, expert veterinary care — where every pet is treated like family and every pet parent is kept informed."
        breadcrumbs={[{ name: "About", href: "/about" }]}
        image={images.receptionWide}
      />

      {/* Story */}
      <section aria-labelledby="story-heading" className="section-y bg-cream">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="story-heading"
              eyebrow="Welcome to The Élite Vets"
              title="Expert medical attention, delivered with compassion"
            />
            <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.8] text-ink/85" data-reveal>
              <p>
                At The Élite Vets Advanced Petcare, we are dedicated to providing compassionate and expert care for our
                furry companions. Our team of experienced veterinarians and staff treat every pet like family, ensuring
                that our pet receives the best medical attention possible. Whether it&apos;s a routine check-up or
                specialized treatment, we offer a wide range of services to keep our pet healthy and happy.
              </p>
              <p>
                We understand that your pet&apos;s health is important to you, and that&apos;s why we use the latest
                veterinary technologies and techniques to deliver high-quality care. From preventative care to
                emergency services, we provide personalized treatments tailored to your pet&apos;s needs.
              </p>
              <p>
                We prioritize building lasting relationships with both pets and pet parents. We believe in open
                communication, educating pet parents, and ensuring your pet&apos;s comfort and safety during every
                visit. Our goal is to provide a welcoming, stress-free environment where your pet will feel at ease.
              </p>
              <p className="font-medium text-navy">
                Trust The Élite Vets Advanced Petcare to be your partner in keeping your pet happy, healthy, and
                thriving. We look forward to serving you and your beloved pet!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-28" data-reveal>
            <div className="relative col-span-2 aspect-16/10 overflow-hidden rounded-panel">
              <Image src={images.operationTheatre.src} alt={images.operationTheatre.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-card">
              <Image src={images.wards.src} alt={images.wards.alt} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-card">
              <Image src={images.treatmentRoom.src} alt={images.treatmentRoom.alt} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Stats className="pb-20 lg:pb-28" />

      {/* Mission & vision */}
      <section aria-labelledby="mission-heading" className="section-y bg-navy text-white">
        <div className="container-x">
          <SectionHeading id="mission-heading" tone="light" eyebrow="Our Purpose" title="Mission & Vision" />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {[
              { icon: Target, title: "Our Mission", text: site.mission },
              { icon: Eye, title: "Our Vision", text: site.vision },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-panel border border-white/10 bg-white/4 p-8 sm:p-10" data-reveal>
                <span className="grid size-12 place-items-center rounded-2xl bg-teal text-white">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-white">{title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/75">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why visit */}
      <section aria-labelledby="visit-heading" className="section-y bg-cream">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading id="visit-heading" eyebrow="Why Visit Us" title="Why you should visit The Élite Vets" />
          <div className="space-y-5 text-[1.05rem] leading-[1.8] text-ink/85" data-reveal>
            <p>
              Visiting The Élite Vets Advanced Petcare ensures your pet receives expert medical attention with
              compassion and care. Our experienced veterinarians use advanced diagnostic tools and the latest treatments
              to provide top-quality care. From routine check-ups to emergency services, we offer personalized
              healthcare tailored to your pet&apos;s needs.
            </p>
            <p>
              Our state-of-the-art facility provides a stress-free environment, ensuring comfort and safety for every
              pet. We focus on preventive care, early diagnosis, and specialized treatments to enhance your pet&apos;s
              well-being. With a dedicated team committed to excellence, The Élite Vets Advanced Petcare is the trusted
              choice for keeping your pet healthy, happy, and thriving.
            </p>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <TeamSection />
      <ContactCTA />
    </>
  );
}
