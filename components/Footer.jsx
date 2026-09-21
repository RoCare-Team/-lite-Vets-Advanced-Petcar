import Link from "next/link";
import { MapPin, Phone, Mail, PawPrint } from "lucide-react";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";
import { InstagramIcon, FacebookIcon, YouTubeIcon, XIcon, LinkedInIcon } from "./ui/BrandIcons";
import { services, serviceHref } from "@/data/services";
import { site } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonial" },
  { label: "Careers", href: "/careers" },
  { label: "Blood Donation", href: "/blood-donation-program" },
  { label: "Stray Welfare", href: "/stray-policy" },
  { label: "Contact", href: "/contact" },
];

const footerServiceSlugs = [
  "24-7-emergency-critical-care-and-hospitalization",
  "soft-tissue-surgery",
  "clinical-diagnostic-laboratory",
  "pet-pharmacy-and-pet-store",
  "grooming",
  "e-consultation",
  "small-animal-internal-medicine",
  "dermatology",
  "cardiology",
  "orthopedic",
  "avians-and-exotics-pet-care",
];
const footerServices = footerServiceSlugs.map((slug) => services.find((s) => s.slug === slug));

const socials = [
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: site.social.youtube, Icon: YouTubeIcon },
  { label: "X (Twitter)", href: site.social.x, Icon: XIcon },
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
];

const heading = "text-[0.8rem] font-semibold tracking-wide text-white";
const link = "text-[0.85rem] text-white/65 transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1.5fr_1.4fr] lg:gap-8 lg:py-14">
        {/* Brand */}
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-[0.85rem] leading-relaxed text-white/55">
            {site.tagline}. Expert and specialised veterinary care for dogs, cats, avians and exotic pets in Gurugram.
          </p>
          <p className="mt-5 flex items-center gap-2 font-script text-2xl text-teal-soft/80">
            Caring pets, every day <PawPrint aria-hidden="true" className="size-4" />
          </p>
        </div>

        <nav aria-label="Quick links">
          <h3 className={heading}>Quick Links</h3>
          <ul className="mt-4 grid gap-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h3 className={heading}>Our Services</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {footerServices.map((s) => (
              <li key={s.slug}>
                <Link href={serviceHref(s)} className={link}>
                  {s.cardName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="text-[0.85rem] font-semibold text-teal-soft hover:text-white">
                View All Services →
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className={heading}>Contact Us</h3>
          <ul className="mt-4 grid gap-3 text-[0.85rem] text-white/65">
            <li className="flex gap-2.5">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal-soft" />
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-white">
                {site.address.full}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal-soft" />
              <span>
                <a href={site.phone.primaryHref} className="hover:text-white">
                  {site.phone.primary}
                </a>
                <span className="text-white/30"> | </span>
                <a href={site.phone.landlineHref} className="hover:text-white">
                  {site.phone.landline}
                </a>
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal-soft" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Social media">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full bg-white/5 text-white/75 ring-1 ring-white/10 transition-colors hover:bg-teal hover:text-white hover:ring-teal"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h3 className={heading}>Newsletter</h3>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-1 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>DSS 107 &amp; 108, Huda Market, Sector 45, Gurugram</p>
        </div>
      </div>
    </footer>
  );
}
