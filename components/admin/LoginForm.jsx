"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { login } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="mt-6 grid gap-4">
      <label className="text-sm font-semibold text-navy">
        Password
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 block h-12 w-full rounded-xl border border-line px-4 focus:border-teal focus:ring-4 focus:ring-teal/15 focus:outline-none"
        />
      </label>
      {state?.error && (
        <p role="alert" className="rounded-xl bg-emergency/10 px-4 py-2.5 text-sm text-emergency">
          {state.error}
        </p>
      )}
      <button
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-teal font-semibold text-white hover:bg-teal-dark disabled:opacity-60"
      >
        {pending ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <LogIn aria-hidden="true" className="size-4" />}
        Sign in
      </button>
    </form>
  );
}
