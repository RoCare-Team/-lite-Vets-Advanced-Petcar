import { ArrowRight, Home, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section-y bg-cream">
      <div className="container-x max-w-2xl text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-5 text-4xl font-bold sm:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          The page may have moved during our redesign. Try our services, or call us if your pet needs help right now.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="dark">
            <Home aria-hidden="true" className="size-4" /> Back to home
          </Button>
          <Button href="/services" variant="outline">
            Our services <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <Button href={site.phone.primaryHref} variant="emergency-outline">
            <Phone aria-hidden="true" className="size-4" /> {site.phone.primary}
          </Button>
        </div>
      </div>
    </section>
  );
}
