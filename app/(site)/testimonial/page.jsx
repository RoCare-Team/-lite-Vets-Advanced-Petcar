import { ArrowUpRight, Quote } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import Stars from "@/components/ui/Stars";
import { GoogleIcon } from "@/components/ui/BrandIcons";
import ContactCTA from "@/components/ContactCTA";
import { testimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Client Testimonials | Trusted Pet Hospital in Gurgaon",
  description:
    "Read Google reviews from pet parents in Gurugram and New Delhi about The Élite Vets Advanced Petcare, Dr. Raghubir S Mehla and the Élite team.",
  path: "/testimonial",
});

export default function TestimonialPage() {
  return (
    <>
      <PageHero
        eyebrow="Élite Reviews"
        title="What pet parents say about us"
        description="Google reviews from families in Gurugram and New Delhi who trust us with their companions."
        breadcrumbs={[{ name: "Testimonials", href: "/testimonial" }]}
      >
        <Button href={site.googleReviewsUrl} variant="light">
          <GoogleIcon className="size-5" /> Read on Google <ArrowUpRight aria-hidden="true" className="size-4" />
        </Button>
      </PageHero>

      <section aria-label="Reviews" className="section-y bg-cream">
        <div className="container-x">
          <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {testimonials.map((t) => (
              <li
                key={t.name}
                data-reveal
                className="mb-5 break-inside-avoid rounded-card border border-line bg-white p-6 shadow-soft sm:p-7"
              >
                <figure>
                  <div className="flex items-center justify-between">
                    <Stars />
                    <Quote aria-hidden="true" className="size-7 fill-teal-soft text-teal-soft" />
                  </div>
                  <blockquote className="mt-4 text-[0.97rem] leading-relaxed text-ink">
                    <p>&ldquo;{t.text}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span className="leading-tight">
                      <span className="block font-semibold text-navy">{t.name}</span>
                      <span className="text-sm text-muted">{t.city}</span>
                    </span>
                    <GoogleIcon className="ml-auto size-5" />
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
