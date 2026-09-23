"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, Phone, Siren, X, CalendarCheck } from "lucide-react";
import Logo from "./Logo";
import SiteSearch from "./SiteSearch";
import PetPortal from "./PetPortal";
import Button from "./ui/Button";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { mainNav, site, bookingLink, whatsappLink } from "@/lib/site";
import { specialtyServices, regularServices, serviceHref } from "@/data/services";

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href === "/services") {
    return pathname.startsWith("/services") || [...specialtyServices, ...regularServices].some((s) => pathname === serviceHref(s));
  }
  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const megaRef = useRef(null);
  const megaButtonRef = useRef(null);

  // Elevate header once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Escape + outside click close the mega menu.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        megaButtonRef.current?.focus();
      }
    };
    const onClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const openMega = useCallback(() => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);
  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled || megaOpen
            ? "border-line bg-white/95 shadow-[0_8px_30px_-18px_rgb(11_43_53/0.35)] backdrop-blur-md"
            : "border-transparent bg-cream/90 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                const linkClass = `relative flex h-10 items-center gap-1 rounded-full px-3 text-[0.92rem] font-medium whitespace-nowrap transition-colors xl:px-3.5 ${
                  active ? "text-teal" : "text-ink/80 hover:text-navy"
                }`;

                if (item.mega) {
                  return (
                    <li
                      key={item.href}
                      ref={megaRef}
                      className="static"
                      onPointerEnter={(e) => e.pointerType === "mouse" && openMega()}
                      onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
                    >
                      <button
                        ref={megaButtonRef}
                        type="button"
                        className={linkClass}
                        aria-expanded={megaOpen}
                        aria-controls="mega-menu"
                        // Keyboard (detail 0) toggles; mouse/touch clicks open (hover already handles mouse).
                        onClick={(e) => (e.detail === 0 ? setMegaOpen((o) => !o) : openMega())}
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden="true"
                          className={`size-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <MegaMenu open={megaOpen} onNavigate={() => setMegaOpen(false)} />
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
                      {item.label}
                      {active && (
                        <span aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <SiteSearch />
            <a
              href={site.phone.primaryHref}
              className="hidden h-11 items-center gap-2.5 rounded-full px-3 text-sm font-semibold whitespace-nowrap text-navy transition-colors hover:text-teal 2xl:flex"
            >
              <span className="grid size-9 place-items-center rounded-full bg-teal-soft text-teal">
                <Phone aria-hidden="true" className="size-4" />
              </span>
              {site.phone.primary}
            </a>
            <PetPortal className="hidden lg:flex" />
            <Button href={bookingLink} size="md" className="hidden lg:inline-flex">
              <CalendarCheck aria-hidden="true" className="size-4" />
              Book Appointment
            </Button>

            {/* Mobile controls */}
            <a
              href={site.phone.primaryHref}
              aria-label={`Call ${site.phone.primary}`}
              className="grid size-11 place-items-center rounded-full bg-emergency/10 text-emergency lg:hidden"
            >
              <Phone aria-hidden="true" className="size-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full bg-navy text-white lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}

/* ─────────────────────────── Mega menu ─────────────────────────── */

function MegaMenu({ open, onNavigate }) {
  return (
    <div
      id="mega-menu"
      className={`absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_30px_60px_-30px_rgb(11_43_53/0.35)] transition-[opacity,transform,visibility] duration-200 ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
      }`}
    >
      <div className="container-x grid grid-cols-[1.6fr_1fr_0.95fr] gap-10 py-10">
        <div>
          <p className="eyebrow">Specialty Services</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1">
            {specialtyServices.map((s) => (
              <MegaLink key={s.slug} service={s} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>

        <div className="border-l border-line pl-10">
          <p className="eyebrow">Regular Services</p>
          <ul className="mt-5 grid gap-y-1">
            {regularServices.map((s) => (
              <MegaLink key={s.slug} service={s} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between rounded-card bg-navy p-7 text-white">
          <div>
            <span className="grid size-11 place-items-center rounded-xl bg-emergency/15 text-emergency">
              <Siren aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-5 text-lg leading-snug font-semibold">Emergency? We&apos;re open 24/7.</p>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Emergency, critical care and hospitalization — day and night.
            </p>
          </div>
          <div className="mt-6 grid gap-2">
            <Button href={site.phone.primaryHref} variant="emergency" size="sm">
              <Phone aria-hidden="true" className="size-4" /> {site.phone.primary}
            </Button>
            <Link
              href="/services"
              onClick={onNavigate}
              className="inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold text-teal-soft transition-colors hover:text-white"
            >
              View all services <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MegaLink({ service, onNavigate }) {
  const Icon = service.icon;
  return (
    <li>
      <Link
        href={serviceHref(service)}
        onClick={onNavigate}
        className="group flex items-center gap-3 rounded-xl px-2.5 py-2 text-[0.92rem] font-medium text-ink transition-colors hover:bg-cream hover:text-navy"
      >
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-lg transition-colors ${
            service.featured ? "bg-emergency/10 text-emergency" : "bg-teal-soft text-teal group-hover:bg-teal group-hover:text-white"
          }`}
        >
          <Icon aria-hidden="true" className="size-4" />
        </span>
        {service.cardName}
      </Link>
    </li>
  );
}

/* ─────────────────────────── Mobile menu ─────────────────────────── */

function MobileMenu({ open, onClose, pathname }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      // Keep keyboard focus inside the dialog.
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={`fixed inset-0 z-[70] lg:hidden ${open ? "" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-navy-deep/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={panelRef}
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <Logo onClick={onClose} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full bg-white text-navy ring-1 ring-line"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              if (item.mega) {
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((o) => !o)}
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      className={`flex w-full items-center justify-between py-4 text-left text-xl font-semibold ${
                        active ? "text-teal" : "text-navy"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      id="mobile-services"
                      className={`grid transition-[grid-template-rows] duration-300 ${servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden" inert={!servicesOpen}>
                        <MobileServiceGroup title="Specialty Services" items={specialtyServices} onClose={onClose} />
                        <MobileServiceGroup title="Regular Services" items={regularServices} onClose={onClose} />
                        <Link
                          href="/services"
                          onClick={onClose}
                          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal"
                        >
                          View all services <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-4 text-xl font-semibold ${active ? "text-teal" : "text-navy"}`}
                  >
                    {item.label}
                    <ArrowRight aria-hidden="true" className="size-5 text-muted/60" />
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/blood-donation-program"
                onClick={onClose}
                className="flex items-center justify-between py-4 text-xl font-semibold text-navy"
              >
                Blood Donation
                <ArrowRight aria-hidden="true" className="size-5 text-muted/60" />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="grid shrink-0 gap-2.5 border-t border-line bg-white px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <PetPortal className="w-full justify-center" onNavigate={onClose} />
          <Button href={bookingLink} size="lg" className="w-full">
            <CalendarCheck aria-hidden="true" className="size-5" /> Book Appointment
          </Button>
          <div className="grid grid-cols-2 gap-2.5">
            <Button href={site.phone.primaryHref} variant="emergency-outline" size="md" className="w-full">
              <Phone aria-hidden="true" className="size-4" /> Call
            </Button>
            <Button href={whatsappLink()} variant="outline" size="md" className="w-full">
              <WhatsAppIcon className="size-4 text-[#25D366]" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileServiceGroup({ title, items, onClose }) {
  return (
    <div className="pb-4">
      <p className="eyebrow mb-2">{title}</p>
      <ul className="grid gap-0.5">
        {items.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.slug}>
              <Link
                href={serviceHref(s)}
                onClick={onClose}
                className="flex min-h-11 items-center gap-3 rounded-xl px-2 py-2 text-[0.95rem] font-medium text-ink active:bg-white"
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${s.featured ? "bg-emergency/10 text-emergency" : "bg-teal-soft text-teal"}`}>
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                {s.cardName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
