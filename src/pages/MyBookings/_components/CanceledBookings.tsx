import SectionErrors from "@/components/errors/SectionErrors";
import useModal from "@/components/Modal/useModal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMyBookingsQuery } from "@/store/api/myBookingsApi";
import type { BookingStatus } from "@/types";
import BookingFilterMobile from "./BookingFilterMobile";
import CanceledCard from "./CanceledCard";

export default function CanceledBookings() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { getParams } = useModal();
  const filter = getParams("filter") as BookingStatus | undefined;

  const { data, isLoading, isError } = useMyBookingsQuery({
    booking_status: filter,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <SectionErrors />;

  const bookings = data?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold capitalize md:text-[28px]">
          Canceled
        </h1>
        {isMobile && <BookingFilterMobile />}
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {bookings.map((booking) => (
          <CanceledCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
