import {
  Siren,
  Brain,
  Eye,
  Bird,
  HeartPulse,
  Sparkles,
  Ribbon,
  Smile,
  Droplets,
  Bone,
  Scissors,
  Activity,
  Stethoscope,
  Pill,
  PawPrint,
  ScanLine,
  Video,
  Microscope,
} from "lucide-react";

// All service content is taken from the existing theelitevets.in service
// pages. `slug` matches the legacy URL (served at "/<slug>" via rewrites in
// next.config.mjs — keep data/service-slugs.mjs in sync when adding one).
//
// image  — square card image (800×800 / 700×700)
// banner — wide image used on the service detail page (1366×768)

export const services = [
  // ───────────────────────────── Specialty ─────────────────────────────
  {
    slug: "24-7-emergency-critical-care-and-hospitalization",
    name: "24/7 Emergency, Critical Care and Hospitalization",
    cardName: "Emergency & Critical Care",
    category: "specialty",
    featured: true,
    icon: Siren,
    summary:
      "Immediate medical attention in times of crisis — a dedicated ICU, life-saving treatment and round-the-clock supervision.",
    seoTitle: "24/7 Emergency & Critical Pet Care in Gurugram",
    metaDescription:
      "24/7 emergency, critical care and hospitalization for pets in Gurugram. Dedicated ICU, advanced diagnostics and continuous monitoring at The Élite Vets Advanced Petcare.",
    headline: "Always Here When Your Pet Needs Us",
    body: [
      "At The Élite Vets Advanced Petcare, we provide 24/7 emergency and critical care to ensure your pet receives immediate medical attention in times of crisis. Our state-of-the-art facility is equipped with advanced diagnostic tools and a dedicated ICU to handle emergencies with precision and care.",
      "Whether it's trauma, poisoning, breathing difficulties, or post-surgical recovery, our experienced veterinarians and trained staff are always ready to deliver life-saving treatments and continuous monitoring. We prioritize your pet's comfort, using modern techniques to stabilize and treat critical conditions effectively.",
      "Our hospitalization services offer round-the-clock supervision, ensuring pets receive personalized care during their recovery. With a commitment to excellence and compassion, The Élite Vets Advanced Petcare is your trusted partner in emergency situations, providing expert medical support whenever your pet needs it most.",
    ],
    closing: "Because every second counts — trust us for critical pet care.",
    image: "/images/service_one/service_1.webp",
    banner: "/images/service_banner/service_banner_1.webp",
    alt: "Dog resting under monitoring in the hospitalization ward",
  },
  {
    slug: "neurology",
    name: "Neurology",
    cardName: "Neurology",
    category: "specialty",
    icon: Brain,
    summary:
      "Diagnosis and treatment of disorders of the brain, spinal cord and nervous system — seizures, paralysis and disc disease.",
    seoTitle: "Advanced Veterinary Neurology Care | Pet Neurologist & Treatment",
    metaDescription:
      "Veterinary neurology in Gurugram for seizures, paralysis, disc disease and nerve disorders — personalised treatment and neurorehabilitation at The Élite Vets.",
    headline: "Advanced Neurology Care for Pets",
    body: [
      "At The Élite Vets Advanced Petcare, we specialize in neurology services to diagnose and treat disorders affecting your pet's brain, spinal cord, and nervous system. Our expert veterinary neurologists use advanced imaging techniques like MRI and CT scans to detect neurological conditions such as seizures, paralysis, disc disease, and nerve disorders.",
      "We provide personalized treatment plans, including medications, rehabilitation therapy, and surgical interventions, ensuring your pet receives the best possible care. Whether your pet is experiencing sudden weakness, loss of coordination, or chronic neurological conditions, our dedicated team offers comprehensive and compassionate support to enhance their quality of life.",
      "With a commitment to innovation and excellence, The Élite Vets Advanced Petcare is your trusted partner in pet neurology and neurorehabilitation. Let us help your furry friend live a healthy, active life with expert neurological care.",
    ],
    closing: "Because every pet deserves a healthy mind and body.",
    image: "/images/service_one/service_9.webp",
    banner: "/images/service_banner/service_banner_9.webp",
    alt: "Veterinarians reviewing a radiograph beside a corgi",
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    cardName: "Ophthalmology",
    category: "specialty",
    icon: Eye,
    summary:
      "Comprehensive eye care — from routine eye exams to treatment of cataracts, glaucoma and corneal ulcers.",
    seoTitle: "Advanced Pet Eye Care | Veterinary Ophthalmology Services",
    metaDescription:
      "Veterinary ophthalmology in Gurugram — diagnosis and treatment of cataracts, glaucoma, corneal ulcers, retinal disease and dry eye at The Élite Vets.",
    headline: "Advanced Ophthalmology for Clearer Vision",
    body: [
      "At The Élite Vets Advanced Petcare, we specialize in veterinary ophthalmology to diagnose and treat a wide range of eye conditions in pets. From routine eye exams to complex surgeries, our experienced veterinarians provide comprehensive eye care to ensure your pet's vision and eye health remain in top condition.",
      "We treat cataracts, glaucoma, corneal ulcers, retinal diseases, infections, and dry eye syndrome, using advanced diagnostic tools like slit-lamp biomicroscopy, tonometry, and ophthalmic ultrasound. Our personalized treatment plans include medications, laser therapy, and surgical interventions to restore and protect your pet's vision.",
      "If your pet shows signs of redness, squinting, excessive tearing, or vision loss, don't wait — early diagnosis is crucial. Trust The Élite Vets Advanced Petcare for expert ophthalmology services, ensuring your pet sees the world clearly and comfortably.",
    ],
    closing: "Healthy eyes, happy pets.",
    image: "/images/service_one/service_8.webp",
    banner: "/images/service_banner/service_banner_8.webp",
    alt: "Veterinarian examining a dog's eye",
  },
  {
    slug: "avians-and-exotics-pet-care",
    name: "Avian and Exotic Pet Care",
    cardName: "Avian & Exotic Care",
    category: "specialty",
    icon: Bird,
    summary:
      "Specialised care for parrots, turtles, rabbits, reptiles and small mammals — check-ups, diagnostics and treatment.",
    seoTitle: "Expert Avians & Exotics Pet Care | Specialized Veterinary Services",
    metaDescription:
      "Avian and exotic pet vet in Gurugram for parrots, turtles, rabbits, reptiles and small mammals — wellness checks, diagnostics, surgery and emergency care.",
    headline: "Specialized Care for Avian & Exotic Pets",
    body: [
      "At The Élite Vets Advanced Petcare, we provide specialized veterinary care for avian and exotic pets, ensuring their unique health needs are met with expert attention. From parrots and turtles to rabbits, reptiles, and small mammals, our experienced veterinarians offer comprehensive medical care, wellness check-ups, diagnostics, and emergency treatments tailored for exotic species.",
      "Our clinic is equipped with advanced diagnostic tools and a stress-free environment, ensuring the well-being of delicate and exotic animals. We treat nutritional disorders, respiratory diseases, infections, metabolic issues, and skin conditions while offering preventive care, vaccinations, and habitat guidance to help your pet thrive.",
      "Whether your exotic pet needs a routine health check, surgery, or specialized treatment, trust The Élite Vets for compassionate and expert avian & exotic pet care. Book an appointment today to keep your feathered and scaled companions healthy and happy.",
    ],
    closing: "Because every pet deserves Élite care.",
    image: "/images/service_one/service_2.webp",
    banner: "/images/service_banner/service_banner_2.webp",
    alt: "Veterinarian gently holding a green parakeet",
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    cardName: "Cardiology",
    category: "specialty",
    icon: HeartPulse,
    summary:
      "Echocardiography, ECG and digital radiography to diagnose and manage heart conditions with care.",
    seoTitle: "Expert Veterinary Cardiology | Advanced Pet Heart Care",
    metaDescription:
      "Pet cardiology in Gurugram — heart murmurs, congestive heart failure, arrhythmias and valve disorders diagnosed with echocardiography and ECG at The Élite Vets.",
    headline: "Expert Cardiac Care for Pets",
    body: [
      "At The Élite Vets Advanced Petcare, we specialize in comprehensive cardiology services for pets, ensuring their heart health is in expert hands. Our experienced veterinary cardiologists diagnose and treat a wide range of heart conditions, including heart murmurs, congestive heart failure, hypertension, arrhythmias, and valve disorders.",
      "Using advanced diagnostic tools such as echocardiography, electrocardiograms (ECG), and digital radiography, we provide accurate diagnoses and personalized treatment plans to improve your pet's quality of life. Whether your pet requires medication management, lifestyle adjustments, or specialized treatments, our team is dedicated to ensuring optimal heart health and longevity.",
      "Early detection and preventive care are key to managing heart disease effectively. If your pet shows signs of fatigue, coughing, difficulty breathing, or fainting, consult our cardiology experts today. Trust The Élite Vets for compassionate, cutting-edge cardiac care that keeps your pet's heart beating strong.",
    ],
    image: "/images/service_one/service_3.webp",
    banner: "/images/service_banner/service_banner_3.webp",
    alt: "Dog receiving a cardiac ultrasound examination",
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    cardName: "Dermatology",
    category: "specialty",
    icon: Sparkles,
    summary:
      "Expert care for skin conditions, allergies, infections and coat disorders — finding the root cause of the itch.",
    seoTitle: "Veterinary Dermatology | Expert Pet Skin Care & Allergy Treatment",
    metaDescription:
      "Pet dermatology in Gurugram — allergy testing, parasite control, fungal and bacterial infections, autoimmune skin disorders and chronic itching relief.",
    headline: "Expert Dermatology Care at The Élite Vets",
    body: [
      "At The Élite Vets Advanced Petcare, we specialize in veterinary dermatology, providing expert care for pets suffering from skin conditions, allergies, infections, and coat disorders. Skin issues can cause discomfort and impact your pet's overall well-being, so we focus on accurate diagnosis and effective treatment.",
      "Our advanced dermatology services include allergy testing, parasite control, fungal and bacterial infection treatments, autoimmune skin disorder management, and chronic itching relief. Using cutting-edge diagnostic tools, we identify the root cause of skin issues and provide personalized treatment plans to restore your pet's comfort.",
      "If your pet experiences constant itching, hair loss, redness, rashes, or unusual skin growths, consult our dermatology experts today. The Élite Vets is committed to ensuring your pet's skin and coat health, keeping them happy, healthy, and itch-free.",
    ],
    image: "/images/service_one/service_5.webp",
    banner: "/images/service_banner/service_banner_5.webp",
    alt: "Veterinarian checking a dog's coat and skin",
  },
  {
    slug: "oncology",
    name: "Oncology",
    cardName: "Oncology",
    category: "specialty",
    icon: Ribbon,
    summary:
      "Compassionate cancer care — early detection, personalised treatment plans, pain management and ongoing support.",
    seoTitle: "Veterinary Oncology | Expert Pet Cancer Treatment & Care",
    metaDescription:
      "Veterinary oncology in Gurugram — biopsy, imaging, chemotherapy and surgical options with compassionate support for pets and families at The Élite Vets.",
    headline: "Compassionate Cancer Care for Pets",
    body: [
      "At The Élite Vets Advanced Petcare, we provide specialized oncology services to diagnose and treat cancer in pets with expertise and compassion. Our veterinary oncologists use advanced diagnostic tools such as biopsy, ultrasound, and imaging to detect tumors early and create personalized treatment plans for each pet.",
      "We offer a range of cancer treatments, including chemotherapy, radiation therapy, immunotherapy, and surgical interventions to improve your pet's quality of life. Our goal is to ensure effective pain management, symptom relief, and ongoing support for both pets and their families.",
      "If your pet shows unusual lumps, weight loss, or sudden behavioral changes, early diagnosis can make a difference. Trust The Élite Vets for expert cancer care, innovative treatments, and a compassionate approach to help your pet fight cancer with strength and dignity.",
    ],
    image: "/images/service_one/service_7.webp",
    banner: "/images/service_banner/service_banner_7.webp",
    alt: "French bulldog calmly positioned for diagnostic imaging",
  },
  {
    slug: "dentistry",
    name: "Dentistry",
    cardName: "Dentistry",
    category: "specialty",
    icon: Smile,
    summary:
      "Preventive dental care, professional cleanings, extractions and periodontal care for healthy smiles.",
    seoTitle: "Veterinary Dentistry | Expert Pet Dental Care & Oral Health",
    metaDescription:
      "Pet dentistry in Gurugram — digital dental X-rays, ultrasonic scaling, cleanings, extractions and periodontal care at The Élite Vets Advanced Petcare.",
    headline: "Healthy Smiles for Happy Pets",
    body: [
      "At The Élite Vets Advanced Petcare, we offer comprehensive veterinary dentistry to keep your pet's teeth and gums healthy. Oral health is essential for your pet's overall well-being, and we specialize in preventive dental care, cleanings, extractions, and advanced treatments to prevent oral diseases.",
      "Our experienced veterinarians use modern diagnostic tools like digital X-rays and ultrasonic scaling to detect and treat dental issues early. Bad breath, swollen gums, and difficulty eating can indicate underlying dental problems. We provide professional cleanings, periodontal care, and corrective procedures to ensure your pet's comfort.",
      "Regular dental check-ups help prevent tooth decay, infections, and serious health issues related to poor oral hygiene. Trust The Élite Vets for expert pet dentistry, ensuring your furry companion enjoys a pain-free, healthy smile for years to come.",
    ],
    image: "/images/service_one/service_4.webp",
    banner: "/images/service_banner/service_banner_4.webp",
    alt: "Veterinarian brushing a dog's teeth",
  },
  {
    slug: "hemodialysis",
    name: "Hemodialysis",
    cardName: "Hemodialysis",
    category: "specialty",
    icon: Droplets,
    summary:
      "Specialised dialysis for pets with kidney failure — removing toxins from the blood and restoring balance.",
    seoTitle: "Pet Hemodialysis | Advanced Kidney Care for Pets",
    metaDescription:
      "Pet hemodialysis in Gurugram for kidney failure and related conditions — advanced dialysis, regular monitoring and compassionate renal care at The Élite Vets.",
    headline: "Advanced Hemodialysis for Pets' Kidney Health",
    body: [
      "At The Élite Vets Advanced Petcare, we provide specialized hemodialysis services for pets suffering from kidney failure and related conditions. Our advanced dialysis treatments help remove toxins from the blood, restoring balance and improving overall well-being.",
      "Kidney disease can be life-threatening, but with early intervention and expert veterinary care, pets can enjoy a better quality of life. Our skilled team uses state-of-the-art hemodialysis equipment to offer precise and effective treatment, reducing complications and enhancing recovery.",
      "Symptoms like increased thirst, loss of appetite, vomiting, and lethargy may indicate kidney problems in pets. With regular monitoring, tailored treatment plans, and compassionate care, we ensure your furry friend receives the best possible support.",
      "Trust The Élite Vets for comprehensive renal care, helping pets lead healthier, longer lives.",
    ],
    image: "/images/service_one/service_6.webp",
    banner: "/images/service_banner/service_banner_6.webp",
    alt: "IV line placed on a pet during treatment",
  },
  {
    slug: "orthopedic",
    name: "Orthopedic",
    cardName: "Orthopedic Care",
    category: "specialty",
    icon: Bone,
    summary:
      "Surgical and non-surgical care for fractures, arthritis, ligament tears and mobility issues.",
    seoTitle: "Pet Orthopedic Care | Expert Bone & Joint Treatment",
    metaDescription:
      "Pet orthopedic care in Gurugram — fracture repair, joint stabilization, ligament injuries, arthritis, physical therapy and pain management at The Élite Vets.",
    headline: "Expert Orthopedic Care for Stronger, Healthier Pets",
    body: [
      "At The Élite Vets Advanced Petcare, we provide specialized orthopedic care to help pets recover from bone, joint, and muscle conditions. Whether it's a fracture, arthritis, ligament tear, or mobility issue, our experienced veterinarians use advanced diagnostic tools and cutting-edge treatments to ensure optimal recovery.",
      "We offer surgical and non-surgical solutions, including fracture repairs, joint stabilization, physical therapy, and pain management. Our team customizes treatment plans to improve mobility, reduce pain, and enhance your pet's quality of life.",
      "If your pet is showing difficulty walking, limping, stiffness, or joint swelling, it's time to consult our orthopedic specialists. With state-of-the-art facilities and a compassionate approach, we ensure a smooth recovery and long-term well-being for your furry companion.",
    ],
    image: "/images/service_one/service_10.webp",
    banner: "/images/service_banner/service_banner_10.webp",
    alt: "Veterinarian bandaging a dog's leg",
  },

  // ───────────────────────────── Regular ─────────────────────────────
  {
    slug: "soft-tissue-surgery",
    name: "Soft Tissue Surgery",
    cardName: "Soft Tissue Surgery",
    category: "regular",
    icon: Scissors,
    summary:
      "Tumour removals, wound repairs, reconstructive and gastrointestinal procedures with complete post-operative care.",
    seoTitle: "Soft Tissue Surgery for Pets | Expert Veterinary Surgical Care",
    metaDescription:
      "Soft tissue surgery for pets in Gurugram — tumour removal, wound repair, reconstructive, gastrointestinal, bladder stone and hernia procedures at The Élite Vets.",
    headline: "Precision & Care in Every Procedure",
    body: [
      "At The Élite Vets Advanced Petcare, we specialize in Soft Tissue Surgery to ensure the well-being of your beloved pets. Our expert veterinarians perform a wide range of procedures, including tumor removals, wound repairs, and reconstructive surgeries, using advanced techniques for optimal outcomes.",
      "Soft tissue surgeries address both medical and emergency needs, such as gastrointestinal procedures, bladder stone removals, and hernia repairs. Our state-of-the-art facilities and modern surgical equipment ensure safe, precise, and minimally invasive procedures to promote faster recovery.",
      "We understand that surgery can be stressful for pet owners, which is why we provide comprehensive pre-surgical evaluations, post-operative care, and pain management to ensure a smooth healing process. At The Élite Vets, your pet's safety and comfort are our top priorities.",
    ],
    image: "/images/ragular/service_2.webp",
    banner: "/images/ragular_banner/service_banner_2.webp",
    alt: "Veterinary surgeon operating under surgical lights",
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    cardName: "Physiotherapy",
    category: "regular",
    icon: Activity,
    summary:
      "Tailored rehabilitation — therapeutic exercise, hydrotherapy, laser and massage therapy to restore mobility.",
    seoTitle: "Expert Pet Physiotherapy | Rehabilitation & Pain Relief",
    metaDescription:
      "Pet physiotherapy in Gurugram for arthritis, neurological conditions, post-surgical recovery and muscle weakness — therapeutic exercise, hydrotherapy, laser and massage.",
    headline: "Restoring Mobility, Enhancing Life",
    body: [
      "At The Élite Vets Advanced Petcare, we offer specialized physiotherapy to help pets recover from injuries, surgeries, and mobility issues. Our expert team uses tailored rehabilitation techniques to improve strength, flexibility, and overall well-being.",
      "Physiotherapy is essential for pets suffering from arthritis, neurological conditions, post-surgical recovery, and muscle weakness. Our treatments include therapeutic exercises, hydrotherapy, laser therapy, and massage therapy, ensuring a pain-free and active life for your furry companions.",
      "Each session is designed to meet your pet's specific needs, promoting faster recovery, pain relief, and improved movement. We create a stress-free and comforting environment to make rehabilitation an easy and enjoyable process.",
      "Whether your pet is recovering from surgery or experiencing age-related mobility issues, our compassionate and experienced physiotherapy team is here to help. At The Élite Vets, we are committed to enhancing your pet's quality of life through expert care and innovative therapies.",
    ],
    highlights: ["Therapeutic exercises", "Hydrotherapy", "Laser therapy", "Massage therapy"],
    image: "/images/ragular/service_5.webp",
    banner: "/images/ragular_banner/service_banner_5.webp",
    alt: "Veterinarian supporting a small dog during physiotherapy",
  },
  {
    slug: "small-animal-internal-medicine",
    name: "Small Animal Internal Medicine",
    cardName: "Internal Medicine",
    category: "regular",
    icon: Stethoscope,
    summary:
      "Advanced diagnosis and treatment of gastrointestinal, respiratory, cardiovascular, endocrine and immune conditions.",
    seoTitle: "Small Animal Internal Medicine | Advanced Diagnosis & Treatment for Pets",
    metaDescription:
      "Small animal internal medicine in Gurugram — diagnosis and treatment of gastrointestinal, respiratory, cardiovascular, endocrine and immune conditions in pets.",
    headline: "Expert Care for Small Animal Health",
    body: [
      "At The Élite Vets Advanced Petcare, our Small Animal Internal Medicine service provides advanced diagnosis and treatment for a variety of complex medical conditions affecting pets. Our experienced veterinary specialists address issues related to the gastrointestinal, respiratory, cardiovascular, endocrine, and immune systems, ensuring your pet receives the highest level of care.",
      "We utilize cutting-edge diagnostic tools, including digital imaging, laboratory testing, and endoscopy, to accurately identify underlying health concerns. Our team tailors treatment plans to each pet's unique needs, focusing on effective management and long-term wellness. Whether your pet is facing chronic illnesses, metabolic disorders, or unexplained symptoms, we are committed to providing compassionate and specialized care.",
      "From early detection to advanced therapeutic solutions, The Élite Vets ensures your pet's health and well-being are in expert hands. Trust us for personalized, high-quality veterinary care that keeps your beloved companion thriving.",
    ],
    image: "/images/ragular/service_1.webp",
    banner: "/images/ragular_banner/service_banner_1.webp",
    alt: "Veterinarian holding a rabbit during a consultation",
  },
  {
    slug: "pet-pharmacy-and-pet-store",
    name: "Pet Pharmacy & Pet Store",
    cardName: "Pet Pharmacy & Store",
    category: "regular",
    icon: Pill,
    summary:
      "Veterinary-approved medications, prescription diets, supplements, premium food and everyday essentials.",
    seoTitle: "Pet Pharmacy & Store | Medications, Food & Supplies",
    metaDescription:
      "Pet pharmacy and pet store at The Élite Vets, Sector 45 Gurugram — veterinary-approved medications, prescription diets, supplements, premium food and accessories.",
    headline: "Your One-Stop Shop for Pet Health & Essentials",
    body: [
      "At The Élite Vets Advanced Petcare, our Pet Pharmacy & Pet Store is dedicated to ensuring your pet's health and happiness. We provide a wide range of high-quality medications, supplements, and prescription diets tailored to your pet's specific needs. Our veterinary-approved pharmacy ensures safe and effective treatments, giving pet owners peace of mind.",
      "In addition to medications, our pet store offers premium pet food, grooming products, accessories, and wellness essentials. We stock trusted brands that support your pet's nutrition, hygiene, and overall well-being. Whether you need prescription refills, flea and tick prevention, or everyday pet essentials, we have you covered.",
      "Our team is always available to offer expert guidance on medications and pet care products, ensuring your pet receives the best possible support. Visit The Élite Vets' Pet Pharmacy & Pet Store for all your furry companion's healthcare and lifestyle needs.",
    ],
    image: "/images/ragular/service_8.webp",
    banner: "/images/gallery_2/new_gallery_11.webp",
    alt: "Shelves of pet medications and supplements",
  },
  {
    slug: "grooming",
    name: "Grooming",
    cardName: "Grooming",
    category: "regular",
    icon: PawPrint,
    summary:
      "Gentle, professional grooming for all breeds and sizes using vet-approved, hypoallergenic products.",
    seoTitle: "Professional Pet Grooming Services | Safe & Gentle Care for Your Pet",
    metaDescription:
      "Professional pet grooming in Gurugram — bathing, brushing, de-shedding, nail trimming, ear cleaning and coat styling with vet-approved products at The Élite Vets.",
    headline: "Pamper Your Pet with Expert Grooming",
    body: [
      "At The Élite Vets Advanced Petcare, we believe that grooming is more than just about looks — it's essential for your pet's overall health and happiness. Our professional grooming services cater to pets of all breeds and sizes, ensuring a stress-free experience with gentle handling. From bathing, brushing, and de-shedding to nail trimming, ear cleaning, and coat styling, we provide a full range of grooming services tailored to your pet's specific needs.",
      "Regular grooming not only keeps your pet's coat shiny and clean but also helps prevent skin infections, matting, and discomfort. We use vet-approved shampoos and hypoallergenic products, ensuring a safe and relaxing grooming session. Whether your pet needs a simple touch-up or a full spa experience, our trained groomers are here to provide top-quality care with love and expertise.",
    ],
    closing: "Trust The Élite Vets Grooming Services to keep your furry friend looking and feeling their best.",
    highlights: ["Bathing & brushing", "De-shedding", "Nail trimming", "Ear cleaning", "Coat styling"],
    image: "/images/ragular/service_6.webp",
    banner: "/images/ragular_banner/service_banner_6.webp",
    alt: "Groomer trimming a Yorkshire terrier",
  },
  {
    slug: "radio-diagnostics",
    name: "Radio Diagnostics",
    cardName: "Radio Diagnostics",
    category: "regular",
    icon: ScanLine,
    summary:
      "X-ray, ultrasound and advanced imaging for precise, early detection with minimal stress to your pet.",
    seoTitle: "Radio Diagnostics for Pets | Advanced X-Ray, Ultrasound & Imaging Services",
    metaDescription:
      "Radio diagnostics for pets in Gurugram — X-ray, ultrasound and advanced imaging for accurate assessment of organs, bones and soft tissues at The Élite Vets.",
    headline: "Advanced Imaging for Accurate Care",
    body: [
      "At The Élite Vets Advanced Petcare, our Radio Diagnostics services provide cutting-edge imaging technology to ensure precise and early detection of health conditions in pets. Using advanced diagnostic tools like X-rays, ultrasounds, CT scans, and MRIs, we can accurately assess internal organs, bones, and soft tissues.",
      "Our skilled veterinarians use non-invasive techniques to diagnose fractures, tumors, heart diseases, and other internal issues with minimal stress to your pet. With high-quality imaging, we can create personalized treatment plans that enhance your pet's recovery and overall well-being.",
      "Early detection is key to effective treatment, and our radiology experts ensure that your furry companion receives the best diagnostic care possible. Whether it's a routine check-up or an emergency case, our state-of-the-art equipment delivers quick and reliable results, giving you peace of mind.",
    ],
    image: "/images/ragular/service_4.webp",
    banner: "/images/ragular_banner/service_banner_4.webp",
    alt: "Small dog under a diagnostic examination lamp",
  },
  {
    slug: "e-consultation",
    name: "E Consultation",
    cardName: "E Consultation",
    category: "regular",
    icon: Video,
    summary:
      "Expert veterinary advice by video call and chat — follow-ups, second opinions and general queries.",
    seoTitle: "Online Vet Consultation | Virtual Pet Care & E-Consultation",
    metaDescription:
      "Online vet consultation with The Élite Vets — video call and chat support for pet health, nutrition, behaviour, follow-ups and second opinions.",
    headline: "Expert Pet Care, Anytime, Anywhere",
    body: [
      "At The Élite Vets Advanced Petcare, we bring expert veterinary care to your fingertips with our E-Consultation services. Whether you need guidance on pet health, nutrition, behavior, or follow-up care, our experienced veterinarians are just a click away. With video calls and chat support, we ensure that your pet receives the attention they deserve without the stress of travel.",
      "Our online consultation service is perfect for routine check-ups, second opinions, or urgent health concerns. We provide clear medical advice, suggest necessary treatments, and help you decide if an in-clinic visit is required. Get real-time expert insights from the comfort of your home.",
    ],
    highlightsTitle: "Why choose E-Consultation?",
    highlights: [
      "Convenient and time-saving",
      "Reduces pet anxiety from clinic visits",
      "Expert guidance from certified veterinarians",
      "Ideal for follow-ups and general queries",
    ],
    image: "/images/ragular/service_7.webp",
    banner: "/images/ragular_banner/service_banner_7.webp",
    alt: "Pet parent on a video consultation with their dachshund",
  },
  {
    slug: "clinical-diagnostic-laboratory",
    name: "Clinical Diagnostic Laboratory",
    cardName: "Diagnostic Laboratory",
    category: "regular",
    icon: Microscope,
    summary:
      "In-house haematology, biochemistry, cytology and microbiology for timely, reliable results.",
    seoTitle: "Clinical Diagnostic Laboratory for Pets | Advanced Veterinary Testing",
    metaDescription:
      "In-house clinical diagnostic laboratory for pets in Gurugram — haematology, biochemistry, cytology, microbiology and pathology testing at The Élite Vets.",
    headline: "Advanced Testing for Your Pet's Health",
    body: [
      "At The Élite Vets Advanced Petcare, our Clinical Diagnostic Laboratory provides cutting-edge testing services to ensure accurate and timely diagnoses for pets. We use state-of-the-art equipment to analyze blood, urine, and tissue samples, helping detect diseases at early stages. Our in-house laboratory enables rapid results, reducing wait times and allowing immediate medical interventions.",
      "Our skilled veterinary professionals conduct hematology, biochemistry, cytology, microbiology, and pathology tests to diagnose infections, organ diseases, and metabolic conditions. Whether your pet needs a routine wellness check or specialized diagnostic testing, we are committed to delivering reliable results.",
      "By integrating advanced diagnostic technology with expert analysis, we enhance treatment precision, ensuring pets receive the best care possible. Trust The Élite Vets for fast, accurate, and compassionate diagnostic services.",
    ],
    image: "/images/ragular/service_3.webp",
    banner: "/images/ragular_banner/service_banner_3.webp",
    alt: "Laboratory technician analysing samples",
  },
];

export const specialtyServices = services.filter((s) => s.category === "specialty");
export const regularServices = services.filter((s) => s.category === "regular");

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}

// Legacy root-level URL (e.g. /grooming) is the canonical, SEO-preserving URL.
export function serviceHref(service) {
  return `/${service.slug}`;
}
