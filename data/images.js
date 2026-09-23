// Central image registry.
// All files live in /public/images and were taken from the existing
// theelitevets.in website. To swap a photo, replace the file (keep the name)
// or change the `src` here — every component reads from this map.
//
// `src: null` means no real asset exists yet; components render an elegant
// branded placeholder in that case.

export const images = {
  logo: { src: "/images/logo-mark.webp", width: 186, height: 160, alt: "The Élite Vets Advanced Petcare logo" },

  hero: {
    src: "/images/banner/why_banner_three.webp",
    width: 1366,
    height: 768,
    alt: "Veterinarian gently examining a golden retriever on the consultation table",
  },
  heroTeam: {
    src: "/images/gallery_1/gallery_7.webp",
    width: 500,
    height: 600,
    alt: "Élite Vets veterinarian settling a pug on the treatment table",
  },

  // Real clinic photography
  reception: {
    src: "/images/gallery_1/new_gallery_2.webp",
    width: 500,
    height: 600,
    alt: "Reception desk at The Élite Vets Advanced Petcare, Sector 45 Gurugram",
  },
  receptionWide: {
    src: "/images/gallery_2/new_gallery_2.webp",
    width: 600,
    height: 400,
    alt: "Waiting lounge and reception at The Élite Vets",
  },
  operationTheatre: {
    src: "/images/gallery_2/new_gallery_5.webp",
    width: 600,
    height: 400,
    alt: "Surgical operation theatre at The Élite Vets",
  },
  treatmentRoom: {
    src: "/images/gallery_2/new_gallery_4.webp",
    width: 600,
    height: 400,
    alt: "Treatment and procedure room at The Élite Vets",
  },
  wards: {
    src: "/images/gallery_2/new_gallery_6.webp",
    width: 600,
    height: 400,
    alt: "In-patient hospitalization kennels at The Élite Vets",
  },
  groomingRoom: {
    src: "/images/gallery_1/gallery_8.webp",
    width: 500,
    height: 600,
    alt: "Groomer styling a Shih Tzu in the grooming room at The Élite Vets",
  },
  petStore: {
    src: "/images/gallery_2/new_gallery_11.webp",
    width: 600,
    height: 400,
    alt: "Pet pharmacy and pet store at The Élite Vets",
  },

  emergency: {
    src: "/images/gallery_1/gallery_4.webp",
    width: 500,
    height: 600,
    alt: "Labrador recovering on a treatment table at The Élite Vets",
  },
  emergencyBand: {
    src: "/images/gallery_2/gallery_4.webp",
    width: 600,
    height: 350,
    alt: "Élite Vets surgeon treating a dog in the operation theatre",
  },
  criticalCare: {
    src: "/images/gallery_1/gallery_10.webp",
    width: 500,
    height: 600,
    alt: "Élite Vets veterinarian preparing an injection for a patient",
  },

  bloodDonation: {
    src: "/images/gallery_2/gallery_3.webp",
    width: 500,
    height: 600,
    alt: "Healthy donor dog being checked at The Élite Vets",
  },
  donorRegistry: {
    src: "/images/gallery_2/gallery_6.webp",
    width: 500,
    height: 600,
    alt: "Pet parent's dog waiting at the clinic before a donation check",
  },
  stray: {
    src: "/images/gallery_2/gallery_8.webp",
    width: 500,
    height: 600,
    alt: "Community dog being cared for at The Élite Vets",
  },

  physiotherapy: {
    src: "/images/ragular/service_5.webp",
    width: 700,
    height: 700,
    alt: "Veterinarian supporting a small dog during a physiotherapy session",
  },
  careers: {
    src: "/images/gallery_1/gallery_12.webp",
    width: 500,
    height: 600,
    alt: "Élite Vets veterinarian with a patient during a consultation",
  },
};
