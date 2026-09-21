import { site } from "./site";

// Build per-page metadata with consistent canonical + Open Graph data.
export function pageMetadata({ title, description, path = "/", image = "/images/banner/banner_10.webp" }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      url: path,
      title: `${title} | ${site.shortName}`,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.shortName}`,
      description,
      images: [image],
    },
  };
}

// ─────────────────────────── JSON-LD ───────────────────────────

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/images/logo.webp`,
  email: site.email,
  telephone: "+919266395550",
  sameAs: Object.values(site.social),
};

export const veterinaryCareSchema = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  "@id": `${site.url}/#clinic`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/gallery_2/new_gallery_2.webp`,
  logo: `${site.url}/images/logo.webp`,
  telephone: ["+919266395550", "+911244141348"],
  email: site.email,
  parentOrganization: { "@id": `${site.url}/#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  hasMap: site.mapsUrl,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  areaServed: ["Gurugram", "Delhi NCR"],
  sameAs: Object.values(site.social),
};

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href === "/" ? "" : item.href}`,
    })),
  };
}

export function serviceSchema(service, path) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: `${site.url}${path}`,
    image: `${site.url}${service.image}`,
    areaServed: { "@type": "City", name: "Gurugram" },
    provider: { "@id": `${site.url}/#clinic` },
  };
}
