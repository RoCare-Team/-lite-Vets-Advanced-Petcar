"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { gallery, galleryCategories } from "@/data/gallery";

export default function GalleryGrid() {
  const [filter, setFilter] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  const items = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter]
  );

  return (
    <>
      <div role="group" aria-label="Filter gallery" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {galleryCategories.map((cat) => {
          const active = cat === filter;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(cat)}
              className={`h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors ${
                active ? "bg-navy text-white" : "border border-line bg-white text-ink hover:border-navy/30"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4">
        {items.map((img, i) => (
          <li key={img.src} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-teal-soft sm:rounded-card"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 30vw, 48vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-navy-deep/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-left text-xs font-medium text-white">{img.alt}</span>
                <Expand aria-hidden="true" className="size-4 shrink-0 text-white" />
              </span>
              <span className="sr-only">View larger</span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox items={items} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}

function Lightbox({ items, index, onChange, onClose }) {
  const closeRef = useRef(null);
  const img = items[index];

  const go = useCallback((dir) => onChange((index + dir + items.length) % items.length), [index, items.length, onChange]);

  useEffect(() => {
    const opener = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const btn =
    "grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${items.length}: ${img.alt}`}
      className="fixed inset-0 z-[80] flex flex-col bg-navy-deep/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4 text-sm text-white/70 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <span className="tabular-nums">
          {index + 1} / {items.length}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={btn}>
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        <figure className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <div className="relative h-full max-h-[75vh] w-full">
            <Image key={img.src} src={img.src} alt={img.alt} fill sizes="90vw" className="object-contain" />
          </div>
          <figcaption className="mt-4 text-center text-sm text-white/80">{img.alt}</figcaption>
        </figure>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label="Previous photo"
          className={`${btn} absolute left-3 sm:left-6`}
        >
          <ChevronLeft aria-hidden="true" className="size-6" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label="Next photo"
          className={`${btn} absolute right-3 sm:right-6`}
        >
          <ChevronRight aria-hidden="true" className="size-6" />
        </button>
      </div>
      <div className="h-6 sm:h-10" />
    </div>
  );
}
