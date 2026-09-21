import Image from "next/image";
import { ArrowRight, Droplet, ShieldCheck, Scale, Smile, HandHeart, Heart } from "lucide-react";
import Button from "./ui/Button";
import { images } from "@/data/images";
import { whatsappLink } from "@/lib/site";

// Eligibility criteria exactly as listed on the existing Blood Donation Program page.
export const donorCriteria = [
  { icon: ShieldCheck, text: "Healthy and vaccinated" },
  { icon: Scale, text: "Within the right age and weight range" },
  { icon: Smile, text: "A calm temperament" },
];

export const donorRegistryLink = whatsappLink(
  "Hello, I would like to register my pet for The Élite Vets Blood Donation Program (Donor Registry)."
);

// Compact homepage card for the Blood Donation Program.
export default function BloodDonation() {
  return (
    <article
      aria-labelledby="blood-heading"
      className="relative isolate grid overflow-hidden rounded-3xl bg-linear-to-br from-[#fdf1ef] via-white to-cream ring-1 ring-emergency/10 sm:grid-cols-[1.45fr_1fr]"
      data-reveal
    >
      <div className="p-6 sm:p-8">
        <p className="eyebrow text-emergency!">
          <Droplet aria-hidden="true" className="size-3.5 fill-current" /> Pet Blood Donation Program
        </p>
        <h2 id="blood-heading" className="mt-2 text-[1.75rem] leading-tight sm:text-[2rem]">
          One Drop. One Life. <span className="text-emergency">One Hero.</span>
        </h2>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
          Pets may need blood after trauma, surgery or serious illness — and blood for pets is limited. Register your
          pet as a donor and help save critically ill pets.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Who can be a donor">
          {donorCriteria.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.75rem] font-medium text-ink ring-1 ring-line">
              <Icon aria-hidden="true" className="size-3.5 text-emergency" /> {text}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <Button href={donorRegistryLink} variant="emergency" size="sm" className="w-full sm:w-auto">
            <HandHeart aria-hidden="true" className="size-4" /> Join the Donor Registry
          </Button>
          <Button href="/blood-donation-program" variant="outline" size="sm" className="w-full sm:w-auto">
            Learn More <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </div>

      <div className="relative min-h-[14rem]">
        <Image
          src={images.bloodDonation.src}
          alt={images.bloodDonation.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 100vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/60 via-transparent to-transparent" />
        <p aria-hidden="true" className="absolute right-4 bottom-4 flex items-center gap-2 font-script text-[1.6rem] leading-none text-white drop-shadow">
          Be a hero for pets in need <Heart className="size-5 fill-emergency text-emergency" />
        </p>
      </div>
    </article>
  );
}
