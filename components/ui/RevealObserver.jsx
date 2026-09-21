"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One shared IntersectionObserver that fades in every [data-reveal] element.
// Content stays visible if JS is off or the user prefers reduced motion.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const observe = () =>
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));

    observe();
    // Pick up elements rendered after navigation / client updates.
    const mutations = new MutationObserver(observe);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
