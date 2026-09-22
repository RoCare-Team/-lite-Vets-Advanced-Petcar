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
| Phone, email, address, social links | `lib/site.js` |
| Homepage hero, service tiles, bookable services, clinics & slots | **Admin panel** at `/admin` (first-run defaults in `data/defaults.js`) |
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

## Online booking & admin

- `/book` — visitors choose clinic → service → date → time slot → their details. Slots come from each
  clinic's hours, break, slot length and "bookings per slot"; full, past and holiday slots are disabled.
  Every booking gets an ID like `EV-7K2QMX`.
- `/admin` — sign in with `ADMIN_PASSWORD`. Manage bookings (confirm / complete / cancel, WhatsApp the
  customer, export CSV), clinics & slot rules, and the homepage hero (heading, tiles, badges, photos with
  upload) plus the list of bookable services.

Set these in `.env.local` (and in your hosting environment):

```bash
ADMIN_PASSWORD=choose-a-strong-password
SESSION_SECRET=any-long-random-string
# STORAGE_DIR=/var/data/elitevets   # optional, defaults to ./storage
```

Data is stored as JSON files (plus uploaded images) in `storage/` via `lib/store.js`. This needs a host
with a persistent disk — a VPS / `npm start`, or Docker with a volume. On serverless hosts with a
read-only filesystem (e.g. Vercel), replace the functions in `lib/store.js` with a database; nothing else
needs to change. Back up the `storage/` folder.

## Other forms

The Donor Registry opens WhatsApp with a prefilled message; the newsletter and job applications open the
visitor's email app addressed to theelitevets@gmail.com.
