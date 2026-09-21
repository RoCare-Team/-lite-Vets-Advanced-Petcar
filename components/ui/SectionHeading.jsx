export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  id,
  className = "",
}) {
  const centered = align === "center";
  const light = tone === "light";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`} data-reveal>
      {eyebrow && (
        <p className={`eyebrow ${centered ? "justify-center" : ""} ${light ? "text-teal-soft/90!" : ""}`}>
          <span aria-hidden="true" className={`h-px w-6 ${light ? "bg-teal-soft/60" : "bg-teal/60"}`} />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={`mt-4 text-[2rem] leading-[1.08] font-bold sm:text-4xl lg:text-[2.9rem] ${
          light ? "text-white" : ""
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? "text-white/70" : "text-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
