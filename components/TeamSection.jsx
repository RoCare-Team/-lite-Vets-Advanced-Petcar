import Image from "next/image";
import { ArrowRight, Award, CalendarCheck, Quote } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import Portrait from "./ui/Portrait";
import { LinkedInIcon } from "./ui/BrandIcons";
import { headVet, team, initials } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { images } from "@/data/images";
import { bookingLink } from "@/lib/site";

// A genuine Google review about Dr. Mehla (see data/testimonials.js).
const headVetReview = testimonials.find((t) => t.name === "Kajal Dahiya");

export default function TeamSection({ showCta = true, headingLevel = "h2" }) {
  return (
    <section aria-labelledby="team-heading" className="section-y bg-cream">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="team-heading"
            as={headingLevel}
            eyebrow="Meet Our Team"
            title="The people behind The Élite care"
            description="Experienced veterinarians and staff who treat every pet like family."
          />
          {showCta && (
            <Button href="/team" variant="outline" className="hidden shrink-0 lg:inline-flex">
              Meet Our Team <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          )}
        </div>

        {/* Head vet — featured */}
        <article
          data-reveal
          className="mt-12 grid overflow-hidden rounded-panel border border-line bg-white shadow-soft lg:mt-14 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative min-h-[22rem] overflow-hidden bg-navy sm:min-h-[26rem]">
            {headVet.photo ? (
              <Portrait person={headVet} large priority sizes="(min-width: 1024px) 40vw, 100vw" />
            ) : (
              <>
                {/* No portrait on file yet: real clinic photo + monogram. Set headVet.photo to replace. */}
                <Image
                  src={images.treatmentRoom.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover opacity-45"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-tr from-navy-deep via-navy/80 to-teal/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span
                    role="img"
                    aria-label={`${headVet.name} monogram`}
                    className="grid size-36 place-items-center rounded-full bg-white/10 text-5xl font-bold tracking-tight text-white ring-1 ring-white/25 backdrop-blur-sm sm:size-44 sm:text-6xl"
                  >
                    {initials(headVet.name)}
                  </span>
                  <span className="mt-6 text-xs font-semibold tracking-[0.2em] text-teal-soft/80 uppercase">
                    The Élite Vets · Gurugram
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col p-7 sm:p-10 lg:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-soft px-3 py-1.5 text-xs font-bold tracking-wide text-teal uppercase">
              <Award aria-hidden="true" className="size-3.5" /> {headVet.role}
            </span>
            <h3 className="mt-5 text-3xl font-bold sm:text-4xl">{headVet.name}</h3>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-muted">
              Dr. Mehla heads the veterinary team at The Élite Vets Advanced Petcare — guiding care from routine
              consultations to emergency, critical and specialised treatment.
            </p>

            {headVetReview && (
              <figure className="mt-8 rounded-2xl bg-cream p-6">
                <Quote aria-hidden="true" className="size-6 fill-teal/15 text-teal" />
                <blockquote className="mt-3 text-[0.98rem] leading-relaxed text-ink">
                  <p>
                    &ldquo;Dr. Raghubir Singh Mehla is amazing — caring, gentle, and truly loves animals. … He not only
                    provided great medical advice but also reassured me during the process.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-3 text-sm text-muted">
                  — {headVetReview.name}, {headVetReview.city} · Google review
                </figcaption>
              </figure>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
              <Button href={bookingLink}>
                <CalendarCheck aria-hidden="true" className="size-4" /> Book a consultation
              </Button>
              <a
                href={headVet.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${headVet.name} on LinkedIn`}
                className="grid size-12 place-items-center rounded-full border border-line text-navy transition-colors hover:border-teal hover:text-teal"
              >
                <LinkedInIcon className="size-4" />
              </a>
            </div>
          </div>
        </article>

        {/* Team */}
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {team.map((person, i) => (
            <li
              key={person.name}
              data-reveal
              style={{ "--reveal-delay": `${(i % 6) * 50}ms` }}
              className="group overflow-hidden rounded-card border border-line bg-white"
            >
              <div className="relative aspect-4/5 overflow-hidden bg-teal-soft">
                <Portrait person={person} sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw" />
              </div>
              <div className="p-3.5 sm:p-4">
                <h3 className="text-[0.95rem] leading-snug font-semibold sm:text-base">{person.name}</h3>
                <p className="mt-0.5 text-xs text-muted sm:text-sm">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>

        {showCta && (
          <Button href="/team" variant="outline" className="mt-8 w-full lg:hidden">
            Meet Our Team <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        )}
      </div>
    </section>
  );
}
