import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";

export default function Logo({ tone = "dark", className = "", onClick }) {
  const light = tone === "light";
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group flex shrink-0 items-center gap-2.5 rounded-lg ${className}`}
      aria-label="The Élite Vets Advanced Petcare — Home"
    >
      <span className={`relative grid size-11 place-items-center rounded-xl bg-white ${light ? "" : "ring-1 ring-navy/5"}`}>
        <Image src={images.logo.src} alt="" width={40} height={34} className="h-[30px] w-auto" priority />
      </span>
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span className={`font-serif text-[1.2rem] font-semibold tracking-tight sm:text-[1.3rem] ${light ? "text-white" : "text-navy"}`}>
          The Élite Vets
        </span>
        <span className={`mt-1 text-[0.58rem] font-semibold tracking-[0.24em] uppercase ${light ? "text-teal-soft/70" : "text-muted"}`}>
          Advanced Petcare
        </span>
      </span>
    </Link>
  );
}
