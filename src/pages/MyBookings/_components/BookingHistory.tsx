import SectionErrors from "@/components/errors/SectionErrors";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useBookingHistoryQuery } from "@/store/api/myBookingsApi";
import BookingFilterMobile from "./BookingFilterMobile";
import HistoryCard from "./HistoryCard";
import HistoryCardSkelton from "./skelton/HistorySkelton";

export default function BookingHistory() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data, isLoading, isError } = useBookingHistoryQuery();

  if (isLoading) return <HistoryCardSkelton />;
  if (isError) return <SectionErrors />;
  if (data?.data.length === 0)
    return (
      <div>
        <h1 className="text-2xl font-semibold capitalize md:text-[28px]">
          Booking History
        </h1>

        <div className="mt-5 grid place-content-center">
          No Booking History Found
        </div>
      </div>
    );

  const history = data?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold capitalize md:text-[28px]">
          Booking History
        </h1>
        {isMobile && <BookingFilterMobile />}
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {history.map((history, index) => (
          <HistoryCard key={index} history={history} />
        ))}
      </div>
    </div>
  );
}
