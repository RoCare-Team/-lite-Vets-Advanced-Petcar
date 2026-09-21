// Team as listed on the existing theelitevets.in website.
// `photo: null` renders a branded monogram placeholder — drop a portrait into
// /public/images/team/ and set the path here to replace it.

export const headVet = {
  name: "Dr. Raghubir S Mehla",
  role: "Head Vet",
  photo: null,
  linkedin: "https://www.linkedin.com/in/dr-raghubir-s-mehla-382437261/",
};

export const team = [
  { name: "Robin Choudhary", role: "Senior Vet Assistant", photo: null },
  { name: "Rohit Sain", role: "Senior Vet Assistant", photo: "/images/team/team_4.jpeg" },
  { name: "Rohit Mehla", role: "Senior Groomer", photo: "/images/team/team_3.jpeg" },
  { name: "Satnarayan", role: "Admin", photo: null },
  { name: "Akash Sangat", role: "Helping Assistant", photo: "/images/team/team_5.jpeg" },
  { name: "Shalu Singh", role: "Assistant Clinic Manager", photo: "/images/team/team_2.jpeg" },
];

export function initials(name) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .filter((w) => w.length > 1)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
