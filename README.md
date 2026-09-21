# The Élite Vets Advanced Petcare — website

Next.js 16 (App Router) · JavaScript/JSX only · Tailwind CSS v4 · Lucide icons.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | File |
| --- | --- |
| Phone, email, address, social links, WhatsApp booking link | `lib/site.js` |
| Design tokens (colours, radii, shadows, font) | `app/globals.css` (`@theme`) |
| Services (all copy from the original site) | `data/services.js` |
| Team | `data/team.js` |
| Reviews | `data/testimonials.js` |
| Stats | `data/stats.js` |
| Gallery photos | `data/gallery.js` |
| Section / page photos | `data/images.js` |
| Careers | `data/careers.js` |
| SEO helpers + JSON-LD (Organization, VeterinaryCare, Breadcrumb, Service) | `lib/seo.js` |

## Replacing images

All photos are in `public/images/` (downloaded from the existing site).
Replace a file keeping its name, or change the path in `data/images.js` / `data/gallery.js`.

**Team portraits:** Dr. Raghubir S Mehla, Robin Choudhary and Satnarayan have no photo on the
current site, so they render a branded monogram. Add a portrait to `public/images/team/` and set
`photo` in `data/team.js`.

## URLs

Original service URLs are preserved at the site root (e.g. `/grooming`, `/neurology`) and are the
canonical URLs. They are served by `app/services/[slug]` through rewrites in `next.config.mjs`;
`/services/<slug>` permanently redirects (308) to the root URL. When adding a service, add its slug to both
`data/services.js` and `data/service-slugs.mjs`.

Old PHP URLs (`/index.php`, `/gallery.php`, `/elite-video-gallery`, the "why choose us" slugs) redirect
to their new equivalents.

## Forms

There is no backend. Appointment requests and the Donor Registry open WhatsApp with a prefilled
message; the newsletter and job applications open the visitor's email app addressed to
theelitevets@gmail.com. Swap these for API calls when a backend exists.
