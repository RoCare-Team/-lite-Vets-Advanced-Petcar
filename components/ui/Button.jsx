import Link from "next/link";

const base =
  "group/btn items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform,border-color] duration-200 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary:
    "bg-teal text-white shadow-[0_10px_24px_-10px_rgb(23_99_168/0.7)] hover:bg-teal-dark hover:shadow-[0_14px_28px_-12px_rgb(23_99_168/0.8)] focus-visible:outline-teal",
  dark: "bg-navy text-white hover:bg-navy-deep focus-visible:outline-navy",
  outline:
    "border border-navy/15 bg-white text-navy hover:border-navy/30 hover:bg-cream focus-visible:outline-teal",
  emergency:
    "bg-emergency text-white shadow-[0_10px_24px_-10px_rgb(214_69_63/0.7)] hover:bg-emergency-dark focus-visible:outline-emergency",
  "emergency-outline":
    "border border-emergency/30 bg-white text-emergency hover:border-emergency hover:bg-emergency/5 focus-visible:outline-emergency",
  light: "bg-white text-navy hover:bg-teal-soft focus-visible:outline-white",
  "ghost-light":
    "border border-white/25 text-white hover:border-white/60 hover:bg-white/10 focus-visible:outline-white",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.94rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className = "" } = {}) {
  // A bare `hidden` (e.g. "hidden lg:inline-flex") must not compete with the
  // default display utility, so only add `inline-flex` when it isn't present.
  const display = /(^|\s)hidden(\s|$)/.test(className) ? "" : "inline-flex";
  return `${display} ${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

function isExternal(href) {
  return /^(https?:|tel:|mailto:)/.test(href);
}

/**
 * Link styled as a button. Internal routes use next/link, external links
 * (WhatsApp, tel:, mailto:) render a plain anchor.
 */
export default function Button({ href, variant, size, className, children, ...props }) {
  const classes = buttonClasses({ variant, size, className });

  if (!href) {
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  }

  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
