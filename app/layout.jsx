import { Plus_Jakarta_Sans, Lora, Caveat } from "next/font/google";
import "./globals.css";
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
      <body className="min-h-dvh overflow-x-clip font-sans">
        <JsonLd data={organizationSchema} />
        <JsonLd data={veterinaryCareSchema} />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
