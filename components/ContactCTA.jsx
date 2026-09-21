import Image from "next/image";
import { CalendarCheck, Phone } from "lucide-react";
import Button from "./ui/Button";
import { images } from "@/data/images";
import { bookingLink, site } from "@/lib/site";

export default function ContactCTA({
  title = "Your Pet Deserves Exceptional Care.",
  text = "Book a consultation with our experienced veterinary team — or call us any time, day or night.",
}) {
  return (
    <section aria-labelledby="cta-heading" className="bg-cream pb-20 lg:pb-28">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-navy px-6 py-16 text-center sm:px-12 lg:py-24" data-reveal>
          <Image
            src={images.heroTeam.src}
            alt=""
            fill
            sizes="100vw"
            className="-z-20 object-cover opacity-25"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-navy/80 via-navy/90 to-navy-deep" />
          <div aria-hidden="true" className="absolute -top-24 left-1/2 -z-10 size-[28rem] -translate-x-1/2 rounded-full bg-teal/30 blur-3xl" />

          <p className="eyebrow justify-center text-teal-soft/90!">
            <span aria-hidden="true" className="h-px w-6 bg-teal-soft/60" />
            The Élite Vets Advanced Petcare
            <span aria-hidden="true" className="h-px w-6 bg-teal-soft/60" />
          </p>
          <h2 id="cta-heading" className="mx-auto mt-5 max-w-3xl text-[2.3rem] leading-[1.05] font-bold text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{text}</p>
          <div className="mx-auto mt-10 flex max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
            <Button href={bookingLink} variant="light" size="lg" className="w-full sm:w-auto">
              <CalendarCheck aria-hidden="true" className="size-5" /> Book an Appointment
            </Button>
            <Button href={site.phone.primaryHref} variant="ghost-light" size="lg" className="w-full sm:w-auto">
              <Phone aria-hidden="true" className="size-5" /> Call {site.phone.primary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
