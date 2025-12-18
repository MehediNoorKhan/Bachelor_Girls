import DateSelect from "@/components/DateSelect";
import useModal from "@/components/Modal/useModal";
import { useMediaQuery } from "@/hooks/use-media-query";
import BookingFilter from "./BookingFilter";
import BookingHistory from "./BookingHistory";
import CanceledBookings from "./CanceledBookings";
import Favorites from "./Favorites";
import RescheduleList from "./RescheduleList";
import ShowFilteredBookings from "./ShowFilteredBookings";

export default function Bookings() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { getParams } = useModal();
  const filter = getParams("filter");

  return (
    <section>
      <div className="container mx-auto flex gap-x-10 max-2xl:px-4">
        {!isMobile && (
          <div className="bg-muted rounded-[10px] p-5">
            <BookingFilter />
          </div>
        )}
        <div className="w-full flex-1">
          {(filter === "pending" || filter === "rescheduled") && (
            <>
              <h2 className="text-[22px] font-semibold">Select Date :</h2>
              {/* Show current month and year */}
              <p className="text-[22px]">
                {new Date().toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <DateSelect day={7} />

              <ShowFilteredBookings />
            </>
          )}

          {filter === "favorite-bookings" && <Favorites />}
          {filter === "booking-history" && <BookingHistory />}
          {filter === "cancelled" && <CanceledBookings />}
          {filter === "reschedule-request-list" && <RescheduleList />}
        </div>
      </div>
    </section>
  );
}
