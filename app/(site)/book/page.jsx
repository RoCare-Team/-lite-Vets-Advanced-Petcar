import { ShieldCheck, Clock3, BellRing } from "lucide-react";
import BookingSection from "@/components/booking/BookingSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book an Appointment",
  description:
    "Book a vet appointment online at The Élite Vets Advanced Petcare — choose your clinic, service, date and time slot in under a minute.",
  path: "/book",
});

export default function BookPage({ searchParams }) {
  return (
    <section className="bg-cream pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="container-x">
        <p className="eyebrow">Online booking</p>
        <h1 className="mt-3 text-[2rem] leading-tight sm:text-4xl lg:text-[2.6rem]">Book an appointment</h1>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <li className="flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="size-4 text-teal" /> Takes under a minute
          </li>
          <li className="flex items-center gap-1.5">
            <BellRing aria-hidden="true" className="size-4 text-teal" /> We call to confirm
          </li>
          <li className="flex items-center gap-1.5">
            <ShieldCheck aria-hidden="true" className="size-4 text-teal" /> Your details stay private
          </li>
        </ul>

        <div className="mt-8">
          <BookingSection searchParams={searchParams} />
        </div>
      </div>
    </section>
  );
}
