import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

/**
 * Hero band used by every internal page: breadcrumb trail (+ schema),
 * eyebrow, H1 and intro. Optional image renders on the right on desktop.
 */
export default function PageHero({ eyebrow, title, description, breadcrumbs = [], image, children }) {
  const trail = [{ name: "Home", href: "/" }, ...breadcrumbs];

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <JsonLd data={breadcrumbSchema(trail)} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 size-[34rem] rounded-full bg-teal/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
      />

      <div className={`container-x relative grid gap-10 py-14 lg:py-20 ${image ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-center" : ""}`}>
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              {trail.map((item, i) => {
                const last = i === trail.length - 1;
                return (
                  <li key={item.href} className="flex items-center gap-1.5">
                    {last ? (
                      <span aria-current="page" className="text-white/90">
                        {item.name}
                      </span>
                    ) : (
                      <>
                        <Link href={item.href} className="rounded transition-colors hover:text-white">
                          {item.name}
                        </Link>
                        <ChevronRight aria-hidden="true" className="size-3.5 text-white/40" />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {eyebrow && (
            <p className="eyebrow mt-8 text-teal-soft/90!">
              <span aria-hidden="true" className="h-px w-6 bg-teal-soft/60" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 max-w-3xl text-[2.3rem] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[3.6rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{description}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>

        {image && (
          <div className="relative hidden aspect-4/3 overflow-hidden rounded-panel ring-1 ring-white/10 lg:block">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
