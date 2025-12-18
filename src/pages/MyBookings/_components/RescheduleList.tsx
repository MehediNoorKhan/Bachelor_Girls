import { useMediaQuery } from "@/hooks/use-media-query";
import BookingFilterMobile from "./BookingFilterMobile";
import RescheduleCard from "./RescheduleCard";

export default function RescheduleList() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold capitalize md:text-[28px]">
          Reschedule Request List
        </h1>
        {isMobile && <BookingFilterMobile />}
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <RescheduleCard />
        <RescheduleCard />
        <RescheduleCard />
        <RescheduleCard />
      </div>
    </div>
  );
}
