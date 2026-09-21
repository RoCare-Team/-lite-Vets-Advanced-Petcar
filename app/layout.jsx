import { Plus_Jakarta_Sans, Lora, Caveat } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingActions from "@/components/FloatingActions";
import RevealObserver from "@/components/ui/RevealObserver";
import JsonLd from "@/components/ui/JsonLd";
import { organizationSchema, veterinaryCareSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-lora",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Cure & Care With Compassion | Expert & Specialised Veterinarians`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "veterinary hospital Gurugram",
    "vet in Sector 45 Gurgaon",
    "24/7 emergency vet Gurugram",
    "pet hospital Gurgaon",
    "exotic pet vet Gurugram",
    "pet grooming Gurugram",
    "The Élite Vets",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: `${site.name} | Expert & Specialised Veterinarians in Gurugram`,
    description: site.description,
    images: [{ url: "/images/banner/banner_10.webp", width: 1920, height: 1080, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theelitevets",
    title: site.name,
    description: site.description,
    images: ["/images/banner/banner_10.webp"],
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport = {
  themeColor: "#0B2B35",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${lora.variable} ${caveat.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-dvh overflow-x-clip pb-[calc(4.25rem+env(safe-area-inset-bottom))] font-sans lg:pb-0">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-navy px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema} />
        <JsonLd data={veterinaryCareSchema} />
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
        <MobileBottomBar />
        <RevealObserver />
      </body>
    </html>
  );
}
