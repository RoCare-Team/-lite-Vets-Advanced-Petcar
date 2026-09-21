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
    src: "/images/banner/banner_10.webp",
    width: 1920,
    height: 1080,
    alt: "Veterinary team smiling while caring for a puppy",
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
    src: "/images/banner/why_banner_four.webp",
    width: 1366,
    height: 768,
    alt: "Veterinarian treating a dog on a drip in the critical care room",
  },
  criticalCare: {
    src: "/images/why_choose_us/why_choose_2.webp",
    width: 800,
    height: 500,
    alt: "Pet receiving critical care monitoring",
  },

  bloodDonation: {
    src: "/images/stray_blood/stray_about.webp",
    width: 700,
    height: 700,
    alt: "Veterinary team checking a healthy husky donor",
  },
  donorRegistry: {
    src: "/images/stray_blood/stray_about_3.webp",
    width: 1920,
    height: 1080,
    alt: "Pet parent registering their dog with the veterinary team",
  },
  stray: {
    src: "/images/stray_blood/stray_about_2.webp",
    width: 1920,
    height: 1080,
    alt: "Veterinary staff caring for animals at the clinic",
  },

  physiotherapy: {
    src: "/images/ragular/service_5.webp",
    width: 700,
    height: 700,
    alt: "Veterinarian supporting a small dog during a physiotherapy session",
  },
  careers: {
    src: "/images/banner/banner_10.webp",
    width: 1920,
    height: 1080,
    alt: "Veterinary team working together",
  },
};
