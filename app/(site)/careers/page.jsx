import Image from "next/image";
import { ChevronDown, MapPin, Mail, Send, Building2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ContactCTA from "@/components/ContactCTA";
import { careers, careersIntro } from "@/data/careers";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Careers – Join Our Passionate Petcare Team",
  description:
    "Career opportunities at The Élite Vets Advanced Petcare, Gurugram — veterinarians, vet assistants, groomers, clinic management, housekeeping and more.",
  path: "/careers",
  image: images.careers.src,
});

function applyLink(title) {
  const subject = encodeURIComponent(`Application: ${title} – The Élite Vets`);
  const body = encodeURIComponent(
    `Hello,\n\nI would like to apply for the ${title} position at The Élite Vets Advanced Petcare, Gurugram.\n\nName:\nPhone:\nExperience:\n\nI have attached my CV.\n`
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Élite Careers"
        title="Start Your Career With The Élite Vets"
        description="Join a team that sets new standards in veterinary excellence — and makes a real impact every day."
        breadcrumbs={[{ name: "Careers", href: "/careers" }]}
        image={images.careers}
      />

      <section aria-labelledby="careers-intro" className="section-y bg-cream">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading id="careers-intro" eyebrow="Why join us" title="Grow with a team that truly cares" />
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-muted" data-reveal>
              {careersIntro.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <div className="relative mt-8 hidden aspect-4/3 overflow-hidden rounded-card lg:block" data-reveal>
              <Image src={images.groomingRoom.src} alt={images.groomingRoom.alt} fill sizes="35vw" className="object-cover" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Current openings</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <MapPin aria-hidden="true" className="size-4 text-teal" /> All roles are based in Gurugram
            </p>
            <ul className="mt-8 grid gap-3">
              {careers.map((job) => (
                <li key={job.title} data-reveal>
                  <details className="group rounded-card border border-line bg-white shadow-soft open:shadow-lift">
                    <summary className="flex cursor-pointer list-none items-center gap-4 rounded-card p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-soft text-teal">
                        <Building2 aria-hidden="true" className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-semibold text-navy">{job.title}</span>
                        <span className="mt-0.5 block text-sm text-muted">
                          {job.department} · Gurugram
                        </span>
                      </span>
                      <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-line px-5 pt-5 pb-6 sm:px-6">
                      <p className="font-semibold text-teal">{job.tagline}</p>
                      <div className="mt-3 space-y-3 text-[0.97rem] leading-relaxed text-ink/85">
                        {job.summary.map((p) => (
                          <p key={p.slice(0, 24)}>{p}</p>
                        ))}
                      </div>
                      {job.sections?.map((section) => (
                        <div key={section.title} className="mt-5">
                          <h3 className="text-sm font-bold tracking-wide text-navy uppercase">{section.title}</h3>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed text-ink/85 marker:text-teal">
                            {section.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Button href={applyLink(job.title)} size="sm">
                          <Send aria-hidden="true" className="size-4" /> Apply Now
                        </Button>
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
            <p className="mt-8 flex items-start gap-3 rounded-2xl bg-white p-5 text-sm text-muted ring-1 ring-line">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" />
              <span>
                Apply by emailing your CV to{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-navy hover:text-teal">
                  {site.email}
                </a>{" "}
                with the role in the subject line.
              </span>
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
