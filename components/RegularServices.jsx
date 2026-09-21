import Image from "next/image";
import { CalendarCheck } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import ServiceCard from "./ServiceCard";
import { regularServices } from "@/data/services";
import { images } from "@/data/images";
import { bookingLink } from "@/lib/site";

export default function RegularServices({ headingLevel = "h2" }) {
  return (
    <section id="regular-services" aria-labelledby="regular-heading" className="section-y bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="regular-heading"
            as={headingLevel}
            eyebrow="Regular Services"
            title="Everyday Care, Complete Support"
            description="From surgery and rehabilitation to grooming, pharmacy and online consultations — everything your pet needs, under one roof."
          />
          <div className="relative mt-8 hidden aspect-4/3 overflow-hidden rounded-card lg:block" data-reveal>
            <Image
              src={images.receptionWide.src}
              alt={images.receptionWide.alt}
              fill
              sizes="30vw"
              className="object-cover"
            />
          </div>
          <Button href={bookingLink} className="mt-8 hidden lg:inline-flex">
            <CalendarCheck aria-hidden="true" className="size-4" /> Book a visit
          </Button>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {regularServices.map((service, i) => (
            <li key={service.slug} data-reveal style={{ "--reveal-delay": `${(i % 2) * 70}ms` }}>
              <ServiceCard service={service} variant="compact" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
