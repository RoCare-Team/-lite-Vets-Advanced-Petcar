import Image from "next/image";
import { Droplet, HeartPulse, ClipboardCheck, PhoneCall, Award, Stethoscope, Sparkles, HandHeart } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ContactCTA from "@/components/ContactCTA";
import { donorCriteria, donorRegistryLink } from "@/components/BloodDonation";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blood Donation Program for Pets",
  description:
    "Join The Élite Vets pet Blood Donation Program in Gurugram. Healthy, vaccinated pets with a calm temperament can register as donors and help save critically ill pets.",
  path: "/blood-donation-program",
  image: images.bloodDonation.src,
});

const steps = [
  { icon: ClipboardCheck, title: "Register your pet", text: "Enrol your pet in our Donor Registry." },
  { icon: Stethoscope, title: "Pre-screening", text: "Our veterinarians perform a thorough pre-screening and health check-up before registering any donor." },
  { icon: PhoneCall, title: "We call when needed", text: "We'll contact you when a critical case arises." },
  { icon: HeartPulse, title: "Save a life", text: "Donors are always treated with the utmost care, comfort and love." },
];

const rewards = [
  { icon: Award, text: "A certificate of appreciation" },
  { icon: Stethoscope, text: "Complimentary health check-up at the time of donation" },
  { icon: Sparkles, text: "Eternal recognition for being a lifesaver" },
];

export default function BloodDonationPage() {
  return (
    <>
      <PageHero
        eyebrow="Blood Donation Program"
        title="A Gift of Life, From One Pet to Another"
        description="One drop, one life, one hero. Let your pet be that hero."
        breadcrumbs={[{ name: "Blood Donation Program", href: "/blood-donation-program" }]}
        image={images.bloodDonation}
      >
        <Button href={donorRegistryLink} variant="emergency" size="lg" className="w-full sm:w-auto">
          <HandHeart aria-hidden="true" className="size-5" /> Join the Donor Registry
        </Button>
      </PageHero>

      <section aria-labelledby="bd-intro" className="section-y bg-cream">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading id="bd-intro" eyebrow="Our initiative" title="Sometimes, one life can save another" />
            <div className="mt-6 space-y-5 text-[1.05rem] leading-[1.8] text-ink/85" data-reveal>
              <p>
                At The Élite Vets Advanced Petcare, we believe that every life is precious. Our Blood Donation Program
                is a heartfelt initiative designed to support critically ill pets in need of blood transfusions. With
                timely donations from healthy and eligible companion animals, we are able to respond quickly in
                emergencies and save lives.
              </p>
            </div>
            <div className="mt-8 rounded-card border-l-4 border-emergency bg-white p-6 shadow-soft" data-reveal>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Droplet aria-hidden="true" className="size-5 fill-emergency text-emergency" /> Why it matters
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                Just like in human medicine, pets too may require blood due to trauma, surgeries, or serious illnesses.
                A single donation can make all the difference during life-threatening situations. Sadly, the
                availability of blood for pets is limited — which is why your pet&apos;s donation is truly lifesaving.
              </p>
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-panel shadow-lift" data-reveal>
            <Image src={images.donorRegistry.src} alt={images.donorRegistry.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="bd-eligibility" className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            id="bd-eligibility"
            align="center"
            eyebrow="Who can be a donor?"
            title="Basic criteria for a safe donation"
            description="To ensure safety, pets must meet these basic criteria."
          />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {donorCriteria.map(({ icon: Icon, text }, i) => (
              <li
                key={text}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` }}
                className="rounded-card border border-line bg-cream p-7 text-center"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-emergency shadow-sm">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <p className="mt-5 font-semibold text-navy">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="bd-how" className="section-y bg-navy text-white">
        <div className="container-x">
          <SectionHeading id="bd-how" tone="light" eyebrow="Join the lifesaving network" title="How the Donor Registry works" />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} data-reveal style={{ "--reveal-delay": `${i * 70}ms` }} className="rounded-card border border-white/10 bg-white/4 p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-emergency/15 text-[#f08a8a]">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-sm font-semibold text-white/35 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-8 rounded-panel bg-white p-7 text-ink sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-2xl font-bold">As a token of gratitude, each donor receives</h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {rewards.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-soft text-teal">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="pt-2 text-[0.95rem] leading-snug font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-muted">
                By participating, you&apos;re not just helping a fellow companion — you&apos;re becoming part of a
                compassionate community.
              </p>
            </div>
            <Button href={donorRegistryLink} variant="emergency" size="lg" className="w-full lg:w-auto">
              <HandHeart aria-hidden="true" className="size-5" /> Join the Donor Registry
            </Button>
          </div>
        </div>
      </section>

      <ContactCTA title="One drop. One life. One hero." text="Let your pet be that hero — or reach out if your pet needs emergency care." />
    </>
  );
}
