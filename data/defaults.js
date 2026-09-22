import { site } from "@/lib/site";

// First-run content for the admin-editable parts of the site. Once an admin
// saves from /admin, the stored copy (storage/*.json) takes over — edit there,
// not here.

export const defaultContent = {
  hero: {
    title: "Care services for *your pet*",
    subtitle: "Book a visit at your nearest clinic in under a minute — pick a service, a date and a time that suits you.",
    ctaLabel: "Book an Appointment",
    highlights: ["Experienced veterinarians", "Advanced diagnostics", "24/7 emergency care"],
    // Clinic photos show the Élite Vets team; /images/hero/* are free-licence
    // Unsplash photos of Indian pet parents (unsplash.com/license).
    tiles: [
      { id: "t1", label: "Consultation", badge: "", image: "/images/gallery_1/gallery_12.webp", href: "/book?service=consultation" },
      { id: "t2", label: "Grooming", badge: "", image: "/images/gallery_1/gallery_8.webp", href: "/book?service=grooming" },
      { id: "t3", label: "Vaccination", badge: "", image: "/images/gallery_1/gallery_10.webp", href: "/book?service=vaccination" },
      { id: "t4", label: "Emergency", badge: "24/7", image: "/images/gallery_1/gallery_7.webp", href: "/24-7-emergency-critical-care-and-hospitalization" },
      { id: "t5", label: "Surgery", badge: "", image: "/images/gallery_2/gallery_4.webp", href: "/book?service=surgery" },
      { id: "t6", label: "Diagnostics", badge: "", image: "/images/hero/kitten-checkup.jpg", href: "/book?service=diagnostics" },
      { id: "t7", label: "Dental Care", badge: "", image: "/images/hero/boy-puppy.jpg", href: "/book?service=dental" },
      { id: "t8", label: "Pharmacy", badge: "", image: "/images/hero/parent-sari.jpg", href: "/pet-pharmacy-and-pet-store" },
      { id: "t9", label: "E-Consultation", badge: "Online", image: "/images/hero/video-consult.jpg", href: "/book?service=video" },
    ],
    banners: [
      { image: "/images/gallery_2/new_gallery_2.webp", alt: "Reception and waiting lounge at The Élite Vets, Sector 45", caption: "Our clinic · Sector 45" },
      { image: "/images/hero/parent-boxer.jpg", alt: "Young man with his Boxer dog", caption: "Loved by pet parents" },
      { image: "/images/hero/parent-puppy.jpg", alt: "Smiling pet parent lifting a puppy", caption: "" },
    ],
  },
  services: [
    { id: "consultation", name: "General Consultation", price: "", note: "Check-ups, illness and follow-ups" },
    { id: "vaccination", name: "Vaccination", price: "", note: "Puppy, kitten and booster shots" },
    { id: "grooming", name: "Grooming", price: "", note: "Bath, haircut, nails and ears" },
    { id: "dental", name: "Dental Care", price: "", note: "Scaling and oral check-up" },
    { id: "diagnostics", name: "Diagnostics & Lab", price: "", note: "Blood tests, X-ray, ultrasound" },
    { id: "surgery", name: "Surgical Consultation", price: "", note: "Pre-surgery assessment" },
    { id: "video", name: "Video Consultation", price: "", note: "Talk to a vet online" },
  ],
  settings: {
    bookingWindowDays: 14,
    minLeadMinutes: 60,
  },
};

export const defaultClinics = [
  {
    id: "sector-45",
    name: "The Élite Vets — Sector 45",
    area: `Sector 45, ${site.address.city}`,
    address: site.address.full,
    phone: site.phone.primary,
    mapsUrl: site.mapsUrl,
    active: true,
    days: [0, 1, 2, 3, 4, 5, 6],
    open: "10:00",
    close: "20:00",
    breakStart: "",
    breakEnd: "",
    slotMinutes: 30,
    capacity: 2,
    blockedDates: [],
  },
];
