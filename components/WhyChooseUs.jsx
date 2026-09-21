import SectionHeading from "./ui/SectionHeading";
import { whyChooseUs } from "@/data/why-choose-us";

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" aria-labelledby="why-heading" className="section-y bg-white">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeading
            id="why-heading"
            eyebrow="Why Choose Us"
            title="Hospital-grade care, with a personal touch"
          />
          <p className="max-w-md text-base leading-relaxed text-muted lg:justify-self-end lg:text-lg" data-reveal>
            Our state-of-the-art facility provides a stress-free environment, ensuring comfort and safety for every
            pet — from preventive care to critical emergencies.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {whyChooseUs.map(({ title, text, icon: Icon }, i) => (
            <li
              key={title}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 70}ms` }}
              className="group relative bg-white p-7 transition-colors duration-300 hover:bg-cream sm:p-9 max-sm:p-6"
            >
              <span className="absolute top-7 right-7 text-sm font-semibold text-muted/40 tabular-nums sm:top-9 sm:right-9">
                0{i + 1}
              </span>
              <span className="grid size-12 place-items-center rounded-2xl bg-teal-soft text-teal transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-navy group-hover:text-white">
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-lg sm:mt-7 font-semibold sm:text-xl">{title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
