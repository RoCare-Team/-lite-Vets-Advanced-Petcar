import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import Portrait from "./ui/Portrait";
import { headVet, team, initials } from "@/data/team";
import { images } from "@/data/images";

// Compact one-row team for the homepage. Full team page: components/TeamSection.jsx
export default function TeamStrip() {
  return (
    <section aria-labelledby="team-strip-heading" className="bg-cream py-12 lg:py-14">
      <div className="container-x">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal>
            <p className="eyebrow">Our Team</p>
            <h2 id="team-strip-heading" className="mt-2 text-[1.9rem] leading-tight sm:text-[2.2rem]">
              Meet Our Expert Veterinary Team
            </h2>
            <p className="mt-1.5 text-sm text-muted sm:text-[0.95rem]">
              Experienced veterinarians and staff who treat every pet like family.
            </p>
          </div>
          <Link href="/team" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark">
            View All Team Members <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="mt-7 grid gap-3 lg:grid-cols-[2.1fr_4.9fr]">
          {/* Head vet */}
          <article className="grid grid-cols-[0.85fr_1fr] overflow-hidden rounded-2xl border border-line bg-white shadow-soft" data-reveal>
            <div className="relative min-h-[13rem] bg-navy">
              {headVet.photo ? (
                <Portrait person={headVet} sizes="(min-width: 1024px) 14vw, 45vw" />
              ) : (
                <>
                  <Image src={images.treatmentRoom.src} alt="" fill sizes="(min-width: 1024px) 14vw, 45vw" className="object-cover opacity-40" />
                  <div aria-hidden="true" className="absolute inset-0 bg-linear-to-tr from-navy-deep via-navy/80 to-teal/40" />
                  <span
                    role="img"
                    aria-label={`${headVet.name} monogram`}
                    className="absolute inset-0 m-auto grid size-20 place-items-center rounded-full bg-white/10 font-serif text-3xl text-white ring-1 ring-white/25"
                  >
                    {initials(headVet.name)}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-col justify-center p-4 sm:p-5">
              <h3 className="font-serif text-lg leading-tight font-semibold text-navy sm:text-xl">{headVet.name}</h3>
              <p className="mt-1 text-sm font-semibold text-teal">{headVet.role}</p>
              <figure className="mt-3">
                <Quote aria-hidden="true" className="size-4 fill-teal/15 text-teal" />
                <blockquote className="mt-1 text-[0.8rem] leading-snug text-muted">
                  <p>&ldquo;Caring, gentle, and truly loves animals.&rdquo;</p>
                </blockquote>
                <figcaption className="mt-1 text-[0.7rem] text-muted/80">— Kajal Dahiya, Google review</figcaption>
              </figure>
            </div>
          </article>

          {/* Team — scrolls horizontally on small screens */}
          <ul className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-6 sm:overflow-visible sm:px-0">
            {team.map((person, i) => (
              <li
                key={person.name}
                data-reveal
                style={{ "--reveal-delay": `${i * 50}ms` }}
                className="group w-36 shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white sm:w-auto"
              >
                <div className="relative aspect-[4/4.4] overflow-hidden bg-teal-soft">
                  <Portrait person={person} sizes="(min-width: 1024px) 11vw, (min-width: 640px) 16vw, 144px" />
                </div>
                <div className="p-2.5">
                  <h3 className="text-[0.82rem] leading-tight font-semibold text-navy">{person.name}</h3>
                  <p className="mt-0.5 text-[0.7rem] leading-snug text-muted">{person.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
