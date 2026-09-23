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
    // Tiles use icons (data/tile-icons.js). Set an image in the admin panel to
    // show a picture instead. Banner photos are the clinic's own treatment shots.
    tiles: [
      { id: "t1", color: "blue", label: "Consultation", badge: "", icon: "stethoscope", image: "", href: "/book?service=consultation" },
      { id: "t2", color: "pink", label: "Grooming", badge: "", icon: "scissors", image: "", href: "/book?service=grooming" },
      { id: "t3", color: "green", label: "Vaccination", badge: "", icon: "syringe", image: "", href: "/book?service=vaccination" },
      { id: "t4", color: "rose", label: "Emergency", badge: "24/7", icon: "siren", image: "", href: "/24-7-emergency-critical-care-and-hospitalization" },
      { id: "t5", color: "cyan", label: "Surgery", badge: "", icon: "briefcase-medical", image: "", href: "/book?service=surgery" },
      { id: "t6", color: "violet", label: "Diagnostics", badge: "", icon: "microscope", image: "", href: "/book?service=diagnostics" },
      { id: "t7", color: "amber", label: "Dental Care", badge: "", icon: "smile", image: "", href: "/book?service=dental" },
      { id: "t8", color: "orange", label: "Pharmacy", badge: "", icon: "pill", image: "", href: "/pet-pharmacy-and-pet-store" },
      { id: "t9", color: "slate", label: "E-Consultation", badge: "Online", icon: "video", image: "", href: "/book?service=video" },
    ],
    banners: [
      { image: "/images/gallery_1/gallery_10.webp", alt: "Élite Vets veterinarian preparing a vaccination", caption: "Vaccination", focus: "center" },
      { image: "/images/gallery_1/gallery_8.webp", alt: "Groomer styling a Shih Tzu at The Élite Vets", caption: "Grooming", focus: "top" },
      { image: "/images/gallery_1/gallery_12.webp", alt: "Veterinarian examining a Labrador with a stethoscope", caption: "Expert treatment", focus: "center" },
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
