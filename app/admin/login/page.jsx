import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import LoginForm from "@/components/admin/LoginForm";
import { isAdmin, adminConfigured } from "@/lib/auth";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="grid min-h-dvh place-items-center px-5 py-12">
      <div className="w-full max-w-sm rounded-panel border border-line bg-white p-8 shadow-soft">
        <Logo />
        <h1 className="mt-6 text-2xl">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted">Manage bookings, clinics and homepage content.</p>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="mt-6 rounded-xl bg-emergency/10 px-4 py-3 text-sm text-emergency">
            Admin is not set up yet. Add <code className="font-mono">ADMIN_PASSWORD</code> to <code className="font-mono">.env.local</code> and
            restart the server.
          </p>
        )}
      </div>
    </div>
  );
}
