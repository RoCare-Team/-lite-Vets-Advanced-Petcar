import Image from "next/image";
import { HandCoins, FileSignature, HeartHandshake } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ContactCTA from "@/components/ContactCTA";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Stray Animal Care Program",
  description:
    "The Élite Vets Stray Animal Welfare Initiative in Gurugram — contribute to the Stray Animal Care Fund or pledge support to help injured and ill stray animals.",
  path: "/stray-policy",
  image: images.stray.src,
});

const ways = [
  {
    icon: HandCoins,
    title: "Immediate Contribution",
    text: "After visiting our clinic, you can choose to contribute to our Stray Animal Care Fund, which directly supports the treatment and rehabilitation of stray animals.",
  },
  {
    icon: FileSignature,
    title: "Pledge to Support",
    text: "By submitting an Expression of Interest (EOI), you can become a registered donor. We'll reach out when a stray animal requires assistance, with details of the case and how your support can help.",
  },
];

export default function StrayPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Social Wellbeing"
        title="Stray Animal Welfare Initiative"
        description="Every animal deserves love, care and a chance at a better life."
        breadcrumbs={[{ name: "Stray Welfare Initiative", href: "/stray-policy" }]}
        image={images.stray}
      />

      <section aria-labelledby="stray-help" className="section-y bg-cream">
        <div className="container-x">
          <SectionHeading
            id="stray-help"
            eyebrow="Supporting stray animals together"
            title="How you can help"
            description="Our Stray Animal Welfare Initiative provides medical assistance and support to stray animals in need. Inspired by the spirit of community giving, we offer two avenues to make a difference."
          />
          <ul className="mt-12 grid gap-5 lg:grid-cols-2">
            {ways.map(({ icon: Icon, title, text }) => (
              <li key={title} data-reveal className="rounded-panel border border-line bg-white p-8 shadow-soft sm:p-10">
                <span className="grid size-12 place-items-center rounded-2xl bg-teal-soft text-teal">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8" data-reveal>
            <Button
              href={whatsappLink("Hello, I would like to support The Élite Vets Stray Animal Welfare Initiative.")}
              size="lg"
              className="w-full sm:w-auto"
            >
              <HeartHandshake aria-hidden="true" className="size-5" /> Express interest on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="stray-commitment" className="section-y bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-4/3 overflow-hidden rounded-panel" data-reveal>
            <Image src={images.bloodDonation.src} alt={images.bloodDonation.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading id="stray-commitment" eyebrow="Transparency" title="Our commitment" />
            <div className="mt-6 space-y-5 text-[1.05rem] leading-[1.8] text-ink/85" data-reveal>
              <p>
                When a stray animal is brought to our attention — be it injured, ill, or in distress — we conduct a
                thorough assessment to determine the necessary care. Funds from our Stray Animal Care Fund are then
                allocated to cover treatments, surgeries, and rehabilitation efforts.
              </p>
              <p>
                Donors receive regular updates on the animal&apos;s progress, ensuring transparency and fostering a
                deeper connection between benefactors and the lives they touch.
              </p>
              <p className="font-semibold text-navy">
                Together, we can create a community where compassion leads the way, and every animal has a chance to
                thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
