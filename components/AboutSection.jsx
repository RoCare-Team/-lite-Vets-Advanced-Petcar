import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import { images } from "@/data/images";
import { whyChooseUs } from "@/data/why-choose-us";

export default function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="bg-white py-14 lg:py-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Photo composition — real clinic photos */}
        <div className="relative pb-10 sm:pr-10 lg:pb-12" data-reveal>
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={images.receptionWide.src}
              alt={images.receptionWide.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-0 bottom-0 hidden w-[42%] overflow-hidden sm:block rounded-2xl border-[5px] border-white shadow-lift">
            <div className="relative aspect-4/3">
              <Image
                src={images.operationTheatre.src}
                alt={images.operationTheatre.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 rounded-2xl bg-navy px-5 py-3.5 text-white shadow-float sm:bottom-6 sm:left-6">
            <p className="text-[0.65rem] font-bold tracking-[0.18em] text-teal-soft/80 uppercase">Our motto</p>
            <p className="mt-0.5 font-script text-2xl leading-none">Cure &amp; Care With Compassion</p>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="eyebrow" data-reveal>
            About Us
          </p>
          <h2 id="about-heading" className="mt-3 text-[2rem] leading-tight sm:text-[2.5rem]" data-reveal>
            Caring for Your Pets, <span className="text-teal">The Élite Way</span>
          </h2>
          <p className="mt-4 text-[0.97rem] leading-relaxed text-muted" data-reveal>
            At The Élite Vets Advanced Petcare, our experienced veterinarians and staff treat every pet like family. We
            use the latest veterinary technologies, personalise every treatment, and believe in open communication with
            pet parents at every visit.
          </p>

          <ul className="mt-7 grid gap-x-6 gap-y-3.5 border-t border-line pt-7 sm:grid-cols-2">
            {whyChooseUs.map(({ icon: Icon, title }, i) => (
              <li
                key={title}
                className="flex items-center gap-3 text-[0.9rem] font-medium text-ink"
                data-reveal
                style={{ "--reveal-delay": `${i * 40}ms` }}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-teal-soft text-teal">
                  <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
                </span>
                {title}
              </li>
            ))}
          </ul>

          <Button href="/about" variant="dark" className="mt-8 w-full sm:w-auto">
            Discover Our Story <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
