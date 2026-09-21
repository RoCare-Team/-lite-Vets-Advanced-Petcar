import { Phone, CalendarCheck } from "lucide-react";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { bookingLink, site, whatsappLink } from "@/lib/site";

// Fixed action bar on mobile/tablet (hidden from lg up).
export default function MobileBottomBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-18px_rgb(11_43_53/0.35)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid h-[4.25rem] max-w-xl grid-cols-[1fr_1fr_1.6fr] items-center gap-2 px-3">
        <li>
          <a
            href={site.phone.primaryHref}
            className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[0.7rem] font-semibold text-emergency active:bg-emergency/10"
          >
            <Phone aria-hidden="true" className="size-5" />
            Call
          </a>
        </li>
        <li>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[0.7rem] font-semibold text-navy active:bg-cream"
          >
            <WhatsAppIcon className="size-5 text-[#25D366]" />
            WhatsApp
          </a>
        </li>
        <li>
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-teal px-3 text-sm font-semibold text-white shadow-[0_10px_20px_-10px_rgb(15_139_141/0.8)] active:bg-teal-dark"
          >
            <CalendarCheck aria-hidden="true" className="size-4" />
            Book Appointment
          </a>
        </li>
      </ul>
    </nav>
  );
}
