import { ArrowRight, Briefcase } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import TeamSection from "@/components/TeamSection";
import ContactCTA from "@/components/ContactCTA";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/data/images";

export const metadata = pageMetadata({
  title: "Meet Our Expert Veterinary Team",
  description:
    "Meet the team at The Élite Vets Advanced Petcare, Gurugram — led by Head Vet Dr. Raghubir S Mehla, with experienced vet assistants, groomers and clinic staff.",
  path: "/team",
  image: images.heroTeam.src,
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Élite Team"
        title="The Élite Vets Advanced Petcare Team"
        description="Experienced, caring people who treat every pet like family — from the consultation room to the grooming table."
        breadcrumbs={[{ name: "Our Team", href: "/team" }]}
      />
      <TeamSection showCta={false} />

      <section className="bg-cream pb-20 lg:pb-28">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 rounded-panel border border-line bg-white p-8 sm:flex-row sm:items-center sm:p-10" data-reveal>
            <div className="flex items-start gap-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-teal-soft text-teal">
                <Briefcase aria-hidden="true" className="size-6" />
              </span>
              <div>
                <h2 className="text-2xl font-bold">Join our growing team</h2>
                <p className="mt-2 max-w-xl text-muted">
                  We&apos;re always welcoming passionate, energetic and dedicated veterinary professionals.
                </p>
              </div>
            </div>
            <Button href="/careers" variant="dark" className="w-full sm:w-auto">
              View openings <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
