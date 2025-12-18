import useModal from "@/components/Modal/useModal";
import { useMediaQuery } from "@/hooks/use-media-query";
import BookingFilterMobile from "./BookingFilterMobile";
import MyBookings from "./MyBookings";

export default function ShowFilteredBookings() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { getParams } = useModal();
  const filter = getParams("filter");

  const activeFilter = filters.find((f) => f.id === filter);

  return (
    <div className="mt-5 md:mt-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold capitalize md:text-[28px]">
          {activeFilter?.label || "Upcoming Bookings"}
        </h1>
        {isMobile && <BookingFilterMobile />}
      </div>

      <MyBookings />
    </div>
  );
}

const filters = [
  { label: "Upcoming Bookings", id: "pending" },
  { label: "Reschedule Bookings", id: "rescheduled" },
  { label: "Favorite Bookings", id: "favorite-bookings" },
  { label: "Booking History", id: "booking-history" },
  { label: "Canceled", id: "canceled" },
  { label: "Reschedule Request List", id: "reschedule-request-list" },
];
