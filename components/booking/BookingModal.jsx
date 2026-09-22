"use client";

import { createContext, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, X } from "lucide-react";

/** Lets content inside the modal (e.g. the confirmation screen) close it. */
export const CloseModalContext = createContext(null);

export default function BookingModal({ children }) {
  const router = useRouter();
  const panel = useRef(null);
  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panel.current?.focus();

    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
      <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-navy/55 backdrop-blur-sm modal-backdrop" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        tabIndex={-1}
        className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[1.75rem] bg-cream shadow-float outline-none modal-panel sm:max-h-[90dvh] sm:rounded-panel"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line bg-white px-5 py-4 sm:px-7">
          <p id="booking-modal-title" className="flex items-center gap-2.5 font-serif text-xl text-navy">
            <span className="grid size-9 place-items-center rounded-xl bg-teal-soft text-teal">
              <CalendarCheck aria-hidden="true" className="size-5" />
            </span>
            Book an appointment
          </p>
          <button
            type="button"
            onClick={close}
            className="grid size-10 place-items-center rounded-full text-muted ring-1 ring-line transition-colors hover:bg-cream hover:text-navy"
          >
            <X aria-hidden="true" className="size-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
          <CloseModalContext.Provider value={close}>{children}</CloseModalContext.Provider>
        </div>
      </div>
    </div>
  );
}
