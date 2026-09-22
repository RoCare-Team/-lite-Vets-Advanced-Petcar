import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingActions from "@/components/FloatingActions";

// Public site chrome. The admin panel (app/admin) sits outside this group.
// `modal` is the @modal slot — the booking modal opens there.
export default function SiteLayout({ children, modal }) {
  return (
    <div className="pb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:pb-0">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-navy px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingActions />
      <MobileBottomBar />
      {modal}
    </div>
  );
}
