import BookingModal from "@/components/booking/BookingModal";
import BookingSection from "@/components/booking/BookingSection";

// Client-side navigation to /book opens booking as a modal over the current
// page. Visiting /book directly (or refreshing) renders the full page instead.
export default function BookingModalPage({ searchParams }) {
  return (
    <BookingModal>
      <BookingSection searchParams={searchParams} />
    </BookingModal>
  );
}
