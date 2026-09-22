// Shared form bits for the admin panel.

export const inputClass =
  "mt-1.5 block h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink focus:border-teal focus:ring-4 focus:ring-teal/15 focus:outline-none";

export function Label({ text, className = "", children }) {
  return (
    <label className={`block text-sm font-semibold text-navy ${className}`}>
      {text}
      {children}
    </label>
  );
}
