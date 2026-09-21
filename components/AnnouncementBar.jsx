import { HeartPulse, Phone, Mail, PawPrint } from "lucide-react";
import { site } from "@/lib/site";

export default function AnnouncementBar() {
  return (
    <div className="bg-navy-deep text-white">
      <div className="container-x flex h-9 items-center justify-between gap-4 text-[0.78rem]">
        <p className="flex min-w-0 items-center gap-2 font-medium">
          <HeartPulse aria-hidden="true" className="size-3.5 shrink-0 text-[#f08a8a]" />
          <span className="truncate">
            24/7 Emergency <span className="hidden sm:inline">&amp; Critical Care</span> Available
          </span>
        </p>

        <p className="hidden items-center gap-2 text-white/65 lg:flex">
          <PawPrint aria-hidden="true" className="size-3.5 text-teal-soft/70" />
          {site.tagline}
        </p>

        <div className="flex shrink-0 items-center gap-4">
          <span className="flex items-center gap-1.5 font-semibold">
            <Phone aria-hidden="true" className="size-3.5 text-teal-soft" />
            <a href={site.phone.primaryHref} className="hover:text-teal-soft">
              {site.phone.primary}
            </a>
            <span className="hidden text-white/30 md:inline">|</span>
            <a href={site.phone.landlineHref} className="hidden hover:text-teal-soft md:inline">
              {site.phone.landline}
            </a>
          </span>
          <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 text-white/80 hover:text-white xl:flex">
            <Mail aria-hidden="true" className="size-3.5 text-teal-soft" />
            {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}
