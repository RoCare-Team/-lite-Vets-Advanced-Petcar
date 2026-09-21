import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { serviceHref } from "@/data/services";

/**
 * Shared service card.
 *  variant "image"   — photo card used for specialty services
 *  variant "compact" — icon-led card used for regular services
 */
export default function ServiceCard({ service, variant = "image", className = "", headingLevel = "h3" }) {
  const Icon = service.icon;
  const Heading = headingLevel;
  const href = serviceHref(service);

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={`group flex h-full flex-col rounded-card border border-line bg-white p-4 sm:p-6 shadow-soft transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-lift ${className}`}
      >
        <div className="flex items-start justify-between">
          <span className="grid size-11 place-items-center rounded-2xl bg-teal-soft sm:size-12 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
            <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-muted/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal"
          />
        </div>
        <Heading className="mt-5 text-[0.95rem] leading-snug font-semibold sm:mt-6 sm:text-lg">{service.cardName}</Heading>
        <p className="mt-2 hidden text-sm leading-relaxed text-muted sm:block">{service.summary}</p>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-teal-soft">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute top-4 left-4 grid size-11 place-items-center rounded-xl bg-white/95 text-teal shadow-sm backdrop-blur">
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-lg font-semibold">{service.cardName}</Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
          Explore Service
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
