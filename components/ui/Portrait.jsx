import Image from "next/image";
import { initials } from "@/data/team";

/**
 * Team portrait. Falls back to an elegant branded monogram when no real
 * photo exists yet (see data/team.js).
 */
export default function Portrait({ person, sizes = "(min-width: 1024px) 25vw, 50vw", priority = false, large = false }) {
  if (person.photo) {
    return (
      <Image
        src={person.photo}
        alt={`${person.name}, ${person.role} at The Élite Vets`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${person.name}, ${person.role} — portrait coming soon`}
      className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-teal-soft via-[#eaf6f3] to-cream"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgb(15_139_141/0.25)_1px,transparent_0)] [background-size:22px_22px]"
      />
      <span
        aria-hidden="true"
        className={`relative flex items-center justify-center rounded-full bg-white font-bold tracking-tight text-teal shadow-soft ring-1 ring-teal/10 ${
          large ? "size-36 text-5xl" : "size-20 text-2xl"
        }`}
      >
        {initials(person.name)}
      </span>
    </div>
  );
}
