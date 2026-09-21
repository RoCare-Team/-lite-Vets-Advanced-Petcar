import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PawPrint } from "lucide-react";
import { gallery } from "@/data/gallery";

// Real clinic photos, compact strip (see data/gallery.js).
const picks = [2, 0, 8, 3, 6, 4].map((i) => gallery[i]);

export default function GalleryPreview() {
  return (
    <section aria-labelledby="gallery-heading" className="bg-white py-10 lg:py-12">
      <div className="container-x grid gap-6 lg:grid-cols-[0.75fr_2.25fr] lg:items-center">
        <div data-reveal>
          <p className="eyebrow">Our Gallery</p>
          <h2 id="gallery-heading" className="mt-2 text-[1.9rem] leading-tight sm:text-[2.2rem]">
            Moments of Care
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            A glimpse into our hospital, our team and the pets we care for every day.
          </p>
          <Link href="/gallery" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark">
            View Gallery <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <ul className="no-scrollbar -mx-5 flex snap-x gap-2.5 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-7 sm:overflow-visible sm:px-0">
          {picks.map((img, i) => (
            <li
              key={img.src}
              data-reveal
              style={{ "--reveal-delay": `${i * 40}ms` }}
              className="group relative aspect-4/5 w-32 shrink-0 snap-start overflow-hidden rounded-xl bg-teal-soft sm:w-auto"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 11vw, (min-width: 640px) 14vw, 128px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </li>
          ))}
          <li className="w-32 shrink-0 snap-start sm:w-auto">
            <Link
              href="/gallery"
              className="flex aspect-4/5 h-full flex-col items-center justify-center rounded-xl bg-teal-soft p-3 text-center font-script text-2xl leading-tight text-navy transition-colors hover:bg-teal hover:text-white"
            >
              Pets make life better
              <PawPrint aria-hidden="true" className="mt-2 size-5" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
