import SectionErrors from "@/components/errors/SectionErrors";
import useModal from "@/components/Modal/useModal";
import { useMyBookingsQuery } from "@/store/api/myBookingsApi";
import type { BookingStatus } from "@/types";
import BookingCard from "./BookingCard";
import MyBookingsSkelton from "./skelton/MyBookingsSkelton";

export default function MyBookings() {
  const { getParams } = useModal();
  const filter = getParams("filter") as BookingStatus | undefined;
  const date = getParams("date");

  const { data, isLoading, isError } = useMyBookingsQuery({
    booking_status: filter,
    date: date || undefined,
  });

  if (isLoading) return <MyBookingsSkelton />;
  if (isError) return <SectionErrors />;
  if (!data?.data?.length) return <div>No bookings found.</div>;

  const bookings = data?.data || [];

  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
