import { serviceSlugs } from "./data/service-slugs.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: import.meta.dirname },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },

  // Preserve the original root-level service URLs (e.g. /grooming) — they are
  // the canonical URLs and render the /services/[slug] page.
  async rewrites() {
    return serviceSlugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/services/${slug}`,
    }));
  },

  // Legacy URLs from the previous PHP site that no longer have their own page.
  async redirects() {
    const toAbout = [
      "top-notch-in-patient-facilities",
      "stringent-protocols-for-critical-care",
      "unmatched-clinical-expertise",
      "advanced-technology-for-superior-surgical-outcomes",
      "state-of-the-art-diagnostics",
    ];
    return [
      // One URL per service: /services/<slug> → canonical legacy URL /<slug>.
      {
        source: `/services/:slug(${serviceSlugs.join("|")})`,
        destination: "/:slug",
        permanent: true,
      },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/gallery.php", destination: "/gallery", permanent: true },
      { source: "/elite-video-gallery", destination: "/gallery", permanent: true },
      { source: "/testimonials", destination: "/testimonial", permanent: true },
      { source: "/career", destination: "/careers", permanent: true },
      {
        source: "/24-7-emergency",
        destination: "/24-7-emergency-critical-care-and-hospitalization",
        permanent: true,
      },
      ...toAbout.map((slug) => ({ source: `/${slug}`, destination: "/about#why-choose-us", permanent: true })),
    ];
  },
};

export default nextConfig;
