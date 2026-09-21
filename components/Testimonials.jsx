"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Stars from "./ui/Stars";
import { GoogleIcon } from "./ui/BrandIcons";
import { featuredTestimonials } from "@/data/testimonials";

// Compact one-at-a-time review card (real Google reviews from the existing site).
export default function Testimonials() {
  const [i, setI] = useState(0);
  const total = featuredTestimonials.length;
  const t = featuredTestimonials[i];
  const go = (d) => setI((n) => (n + d + total) % total);

  return (
    <article aria-labelledby="reviews-heading" className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-7" data-reveal>
      <div className="flex items-center justify-between">
        <h2 id="reviews-heading" className="font-sans! text-xs! font-bold! tracking-[0.16em]! text-muted uppercase">
          What Pet Parents Say
        </h2>
        <GoogleIcon className="size-6" />
      </div>

      <div className="mt-4 flex-1" aria-live="polite">
        <div className="flex items-center justify-between">
          <Stars className="size-4" />
          <Quote aria-hidden="true" className="size-6 fill-teal-soft text-teal-soft" />
        </div>
        <blockquote className="mt-3 text-[0.92rem] leading-relaxed text-ink">
          <p className="line-clamp-6">&ldquo;{t.text}&rdquo;</p>
        </blockquote>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-white">
          {t.name
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-sm font-semibold text-navy">{t.name}</span>
          <span className="block text-xs text-muted">{t.city} · Google review</span>
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="grid size-9 place-items-center rounded-full border border-line text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className="grid size-9 place-items-center rounded-full border border-line text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1" aria-hidden="true">
          {featuredTestimonials.map((r, n) => (
            <span key={r.name} className={`h-1.5 rounded-full transition-all ${n === i ? "w-5 bg-teal" : "w-1.5 bg-line"}`} />
          ))}
        </div>
        <Link href="/testimonial" className="text-xs font-semibold text-teal hover:text-teal-dark">
          Read all reviews →
        </Link>
      </div>
    </article>
  );
}
