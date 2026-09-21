import { services, serviceHref } from "@/data/services";
import { site } from "@/lib/site";

export default function sitemap() {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    { path: "/team", priority: 0.7 },
    { path: "/gallery", priority: 0.6 },
    { path: "/testimonial", priority: 0.6 },
    { path: "/careers", priority: 0.5 },
    { path: "/blood-donation-program", priority: 0.7 },
    { path: "/stray-policy", priority: 0.5 },
    { path: "/contact", priority: 0.8 },
  ];

  return [
    ...pages.map(({ path, priority }) => ({
      url: `${site.url}${path === "/" ? "" : path}`,
      changeFrequency: "monthly",
      priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}${serviceHref(s)}`,
      changeFrequency: "monthly",
      priority: s.featured ? 0.9 : 0.8,
    })),
  ];
}
