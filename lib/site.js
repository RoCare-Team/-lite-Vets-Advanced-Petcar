// Central business information. Everything here comes from the existing
// theelitevets.in website — update in one place and it flows everywhere.

export const site = {
  name: "The Élite Vets Advanced Petcare",
  shortName: "The Élite Vets",
  tagline: "Cure & Care With Compassion",
  url: "https://www.theelitevets.in",
  description:
    "The Élite Vets Advanced Petcare, Sector 45 Gurugram — expert and specialised veterinarians offering 24/7 emergency & critical care, hospitalization, advanced diagnostics, surgery, grooming and care for dogs, cats, avians and exotic pets.",
  address: {
    line1: "DSS 107 & 108 Ground Floor Basement",
    line2: "Huda Market, Sector 45",
    city: "Gurugram",
    region: "Haryana",
    country: "IN",
    full: "DSS 107 & 108 Ground floor Basement, Huda Market, Sector 45, Gurugram",
  },
  phone: {
    primary: "+91 92663 95550",
    primaryHref: "tel:+919266395550",
    landline: "0124-4141348",
    landlineHref: "tel:01244141348",
  },
  email: "theelitevets@gmail.com",
  whatsappNumber: "919266395550",
  mapsUrl: "https://maps.app.goo.gl/kHGkvzjUJYRjLmFK7",
  mapsEmbed:
    "https://maps.google.com/maps?q=The%20Elite%20Vets%20Advanced%20Petcare%2C%20Huda%20Market%2C%20Sector%2045%2C%20Gurugram&z=16&output=embed",
  googleReviewsUrl: "https://g.co/kgs/8egmyqS",
  petStoreUrl: "https://www.kirtipetstore.com/",
  social: {
    instagram: "https://www.instagram.com/theelitevets",
    facebook: "https://www.facebook.com/theelitevets/",
    youtube: "https://www.youtube.com/@THE%C3%89LITEVETS",
    x: "https://x.com/theelitevets",
    linkedin: "https://www.linkedin.com/in/dr-raghubir-s-mehla-382437261/",
  },
  mission:
    "To bring a Paradigm Shift in Pet Practice by providing Affordable Expert and Advanced Vetcare for our beloved Pets.",
  vision:
    "To create an environment which is conducive for both Pets and Pet Parents by providing Top-notch Advanced and Specialised Veterinary Care which would be affordable without compromising Pet Health and Care.",
};

export function whatsappLink(message = "Hello, I want to know more about your services.") {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Online booking page (clinic → service → date → slot → details).
export const bookingLink = "/book";

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", mega: true },
  { label: "Our Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];
