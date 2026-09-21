import { PawPrint } from "lucide-react";
import { stats } from "@/data/stats";
import { site } from "@/lib/site";

const fmt = new Intl.NumberFormat("en-IN");

// Full-width navy stats strip (figures from the existing website).
export default function Stats() {
  return (
    <section aria-label="The Élite Vets in numbers" className="bg-navy text-white">
      <div className="container-x flex items-center gap-8 py-6 lg:py-7">
        <ul className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <li key={label} className="flex items-center gap-3.5" data-reveal style={{ "--reveal-delay": `${i * 60}ms` }}>
              <Icon aria-hidden="true" className="size-8 shrink-0 text-teal-soft/80" strokeWidth={1.4} />
              <span className="leading-tight">
                <span className="block text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                  {fmt.format(value)}
                  {suffix}
                </span>
                <span className="block text-xs text-white/65 sm:text-[0.8rem]">{label}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="hidden shrink-0 items-center gap-2 border-l border-white/15 pl-8 font-script text-[1.7rem] leading-none text-teal-soft/85 xl:flex">
          {site.tagline}
          <PawPrint aria-hidden="true" className="size-5" />
        </p>
      </div>
    </section>
  );
}
