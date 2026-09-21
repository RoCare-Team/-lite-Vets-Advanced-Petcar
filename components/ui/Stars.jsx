import { Star } from "lucide-react";

// Decorative review stars (reviews shown are Google reviews published on the
// clinic's own website).
export default function Stars({ className = "size-4" }) {
  return (
    <span className="flex items-center gap-0.5 text-[#F4B400]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-current`} />
      ))}
    </span>
  );
}
