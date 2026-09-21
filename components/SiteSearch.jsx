"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, FileText } from "lucide-react";
import { services, serviceHref } from "@/data/services";

const pages = [
  { name: "About Us", href: "/about" },
  { name: "All Services", href: "/services" },
  { name: "Our Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
  { name: "Testimonials", href: "/testimonial" },
  { name: "Careers", href: "/careers" },
  { name: "Blood Donation Program", href: "/blood-donation-program" },
  { name: "Stray Welfare Initiative", href: "/stray-policy" },
  { name: "Contact & Appointments", href: "/contact" },
];

const index = [
  ...services.map((s) => ({ name: s.name, href: serviceHref(s), icon: s.icon, keywords: `${s.summary} ${s.cardName}` })),
  ...pages.map((p) => ({ ...p, icon: FileText, keywords: "" })),
];

// Lightweight client-side search over services and pages (no backend).
export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const triggerRef = useRef(null);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return index.slice(0, 8);
    return index.filter((i) => `${i.name} ${i.keywords}`.toLowerCase().includes(term)).slice(0, 8);
  }, [q]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
    setQ("");
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search services and pages"
        className="grid size-10 place-items-center rounded-full text-navy transition-colors hover:bg-teal-soft hover:text-teal"
      >
        <Search aria-hidden="true" className="size-[18px]" />
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Search" className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh]">
          <div className="absolute inset-0 bg-navy-deep/50 backdrop-blur-sm" onClick={close} aria-hidden="true" />
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-float">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search aria-hidden="true" className="size-5 text-muted" />
              <label htmlFor="site-search" className="sr-only">
                Search
              </label>
              <input
                ref={inputRef}
                id="site-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services, e.g. grooming, cardiology…"
                autoComplete="off"
                className="h-14 flex-1 bg-transparent text-[0.97rem] text-ink placeholder:text-muted/70 focus:outline-none"
              />
              <button type="button" onClick={close} aria-label="Close search" className="grid size-9 place-items-center rounded-full hover:bg-cream">
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results for “{q}”.</li>}
              {results.map(({ name, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] text-ink hover:bg-cream focus-visible:bg-cream"
                  >
                    <span className="grid size-8 place-items-center rounded-lg bg-teal-soft text-teal">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <span className="flex-1">{name}</span>
                    <ArrowRight aria-hidden="true" className="size-4 text-muted/50 group-hover:text-teal" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
