import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import Logo from "@/components/Logo";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";

export default async function PanelLayout({ children }) {
  await requireAdmin();

  return (
    <div className="lg:grid lg:min-h-dvh lg:grid-cols-[15rem_1fr]">
      <aside className="border-b border-line bg-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between px-5 py-4 lg:py-6">
          <Logo />
        </div>
        <AdminNav />
        <div className="hidden gap-1 border-t border-line p-3 lg:mt-auto lg:grid">
          <Link href="/" target="_blank" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted hover:bg-cream hover:text-navy">
            <ExternalLink aria-hidden="true" className="size-4" /> View website
          </Link>
          <form action={logout}>
            <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted hover:bg-cream hover:text-emergency">
              <LogOut aria-hidden="true" className="size-4" /> Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0 px-4 py-6 sm:px-8 lg:py-10">
        {children}
        <form action={logout} className="mt-10 lg:hidden">
          <button className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-emergency">
            <LogOut aria-hidden="true" className="size-4" /> Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
