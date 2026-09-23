import { UserRound } from "lucide-react";
import { petPortal } from "@/lib/site";

// Pet parent portal entry point. Login and Register still open the portal on
// the previous site — change the URLs in lib/site.js when the new one is ready.
export default function PetPortal({ className = "", onNavigate }) {
  const linkClass =
    "rounded font-semibold text-emergency underline-offset-2 transition-colors hover:text-emergency-dark hover:underline";

  return (
    <div
      className={`flex h-12 items-center gap-2.5 rounded-full border border-line bg-white pr-4 pl-1.5 ${className}`}
    >
      <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-emergency/10 text-emergency">
        <UserRound className="size-[18px]" />
      </span>
      <span className="leading-tight whitespace-nowrap">
        <span className="block text-[0.78rem] font-bold text-navy">My Pet Portal</span>
        <span className="block text-[0.75rem] text-muted">
          <a href={petPortal.login} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={linkClass}>
            Login
          </a>
          <span aria-hidden="true"> / </span>
          <a href={petPortal.register} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={linkClass}>
            Register
          </a>
        </span>
      </span>
    </div>
  );
}
