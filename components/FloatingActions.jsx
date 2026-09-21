import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { site, whatsappLink } from "@/lib/site";

// Desktop-only floating WhatsApp + emergency call buttons.
export default function FloatingActions() {
  const base =
    "group relative grid size-14 place-items-center rounded-full text-white shadow-float transition-transform duration-200 hover:-translate-y-0.5";
  const tip =
    "pointer-events-none absolute right-full mr-3 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100";

  return (
    <div className="fixed right-6 bottom-6 z-40 hidden flex-col gap-3 lg:flex">
      <a href={site.phone.primaryHref} aria-label={`Emergency call ${site.phone.primary}`} className={`${base} animate-pulse-ring bg-emergency`}>
        <Phone aria-hidden="true" className="size-5" />
        <span className={tip} aria-hidden="true">
          Emergency · {site.phone.primary}
        </span>
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`${base} bg-[#25D366]`}
      >
        <WhatsAppIcon className="size-6" />
        <span className={tip} aria-hidden="true">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
