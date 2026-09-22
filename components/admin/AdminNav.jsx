"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Building2, LayoutTemplate } from "lucide-react";

const links = [
  { href: "/admin", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/clinics", label: "Clinics & slots", icon: Building2 },
  { href: "/admin/content", label: "Homepage & services", icon: LayoutTemplate },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-3 lg:grid lg:pb-0">
      {links.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold whitespace-nowrap ${
              active ? "bg-teal-soft text-teal-dark" : "text-ink hover:bg-cream"
            }`}
          >
            <Icon aria-hidden="true" className="size-4" /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
