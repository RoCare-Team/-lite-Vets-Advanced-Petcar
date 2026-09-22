import { connection } from "next/server";
import BookingWizard from "./BookingWizard";
import { getClinics, getContent } from "@/lib/store";
import { clinicNow } from "@/lib/slots";

// Loads clinics/services and renders the wizard. Used by the /book page and
// by the booking modal that opens over any page.
export default async function BookingSection({ searchParams }) {
  await connection();
  const [{ service, clinic }, clinics, content] = await Promise.all([searchParams, getClinics(), getContent()]);

  const publicClinics = clinics
    .filter((c) => c.active)
    .map(({ id, name, area, address, phone, days, open, close, blockedDates }) => ({
      id,
      name,
      area,
      address,
      phone,
      days,
      open,
      close,
      blockedDates,
    }));

  if (publicClinics.length === 0) {
    return (
      <p className="rounded-panel border border-line bg-white p-8 text-center text-muted">
        Online booking is paused right now. Please call us to book.
      </p>
    );
  }

  return (
    <BookingWizard
      clinics={publicClinics}
      services={content.services}
      windowDays={content.settings.bookingWindowDays}
      today={clinicNow().date}
      initialService={typeof service === "string" ? service : ""}
      initialClinic={typeof clinic === "string" ? clinic : ""}
    />
  );
}
