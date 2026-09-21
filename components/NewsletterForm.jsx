"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";

// No mailing backend exists yet, so the form hands off to the clinic's inbox
// via the visitor's mail app. Swap `onSubmit` for an API call when one exists.
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  function onSubmit(e) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    const subject = encodeURIComponent("Newsletter subscription");
    const body = encodeURIComponent(`Please subscribe ${email} to The Élite Vets newsletter.`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={onSubmit} className="mt-5" noValidate={false}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex rounded-full bg-white/5 p-1.5 ring-1 ring-white/15 transition-shadow focus-within:ring-teal">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/45 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-teal text-white transition-colors hover:bg-teal-dark"
        >
          {status === "sent" ? <Check aria-hidden="true" className="size-4" /> : <ArrowRight aria-hidden="true" className="size-4" />}
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-xs text-white/55">
        {status === "sent" ? "Thanks! Your mail app should open to confirm the subscription." : "Pet care tips, health updates and clinic news."}
      </p>
    </form>
  );
}
