// Real photography from the existing theelitevets.in gallery.
// Add a photo: drop it into /public/images/gallery_*/ and append an entry.

const P = (src, width, height, alt, category) => ({ src, width, height, alt, category });

const portrait = (file, alt, category) => P(`/images/gallery_1/${file}`, 500, 600, alt, category);
const wide = (file, alt, category) => P(`/images/gallery_2/${file}`, 600, 350, alt, category);
const wider = (file, alt, category) => P(`/images/gallery_2/${file}`, 600, 400, alt, category);

export const galleryCategories = ["All", "Our Hospital", "Patients", "Care & Treatment", "Pharmacy & Store"];

export const gallery = [
  portrait("new_gallery_2.webp", "Reception desk with The Élite Vets logo", "Our Hospital"),
  wide("gallery_10.webp", "Close-up of a happy golden retriever", "Patients"),
  portrait("gallery_12.webp", "Veterinarian with a dog patient", "Care & Treatment"),
  wider("new_gallery_5.webp", "Surgical operation theatre", "Our Hospital"),
  portrait("gallery_8.webp", "Groomer styling a Shih Tzu on the grooming table", "Care & Treatment"),
  wide("gallery_7.webp", "Chihuahua after a grooming session", "Patients"),
  portrait("gallery_3.webp", "Veterinarian gently holding a small bird", "Care & Treatment"),
  wider("new_gallery_2.webp", "Waiting lounge and reception", "Our Hospital"),
  portrait("gallery_11.webp", "Golden retriever standing in the clinic", "Patients"),
  wide("gallery_4.webp", "Veterinary staff treating a small dog", "Care & Treatment"),
  portrait("gallery_4.webp", "Labrador resting with a recovery cone after treatment", "Care & Treatment"),
  wider("new_gallery_6.webp", "In-patient hospitalization kennels", "Our Hospital"),
  portrait("gallery_1.webp", "Fluffy Pomeranian visiting the clinic", "Patients"),
  wide("gallery_9.webp", "Dog beside The Élite Vets reception logo", "Patients"),
  portrait("new_gallery_3.webp", "Hospital corridor and treatment rooms", "Our Hospital"),
  wide("gallery_2.webp", "Freshly groomed Shih Tzu", "Patients"),
  portrait("gallery_7.webp", "Pug in a red sweater receiving treatment", "Care & Treatment"),
  wider("new_gallery_4.webp", "Treatment and procedure room", "Our Hospital"),
  portrait("gallery_9.webp", "Labrador relaxing on the clinic floor", "Patients"),
  wide("gallery_12.webp", "Two small dogs visiting the clinic", "Patients"),
  portrait("gallery_2.webp", "Diagnostic radiograph of a dog's skull", "Care & Treatment"),
  wider("new_gallery_11.webp", "Pet store and waiting area", "Pharmacy & Store"),
  portrait("gallery_5.webp", "Dog recovering with a cone and bandage", "Care & Treatment"),
  wide("gallery_6.webp", "Happy beagle on the examination table", "Patients"),
  portrait("new_gallery_4.webp", "Operation theatre with surgical lighting", "Our Hospital"),
  wider("new_gallery_3.webp", "Glass-fronted consultation rooms", "Our Hospital"),
  portrait("new_gallery_14.webp", "Pet store shelves and seating", "Pharmacy & Store"),
  wide("gallery_1.webp", "Boxer in profile", "Patients"),
  portrait("new_gallery_5.webp", "Stainless steel grooming tub", "Our Hospital"),
  wider("new_gallery_12.webp", "Well-stocked veterinary pharmacy", "Pharmacy & Store"),
  portrait("gallery_10.webp", "Veterinarian examining a patient", "Care & Treatment"),
  wide("gallery_8.webp", "Indie dog resting comfortably", "Patients"),
  portrait("new_gallery_13.webp", "Harnesses and leashes in the pet store", "Pharmacy & Store"),
  wide("gallery_3.webp", "Beagle mix in a harness on the table", "Patients"),
  portrait("new_gallery_10.webp", "Veterinary supplements in the pharmacy", "Pharmacy & Store"),
  portrait("gallery_6.webp", "Orthopaedic radiograph", "Care & Treatment"),
  wider("new_gallery_1.webp", "Reception and pharmacy counter", "Our Hospital"),
  portrait("new_gallery_1.webp", "Illuminated reception counter", "Our Hospital"),
];

// Curated selection for the homepage preview (masonry-friendly order).
export const galleryPreview = [0, 1, 2, 3, 4, 6, 5, 8, 7].map((i) => gallery[i]);
