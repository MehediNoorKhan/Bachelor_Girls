import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetBookingsQuery } from "@/store/api/dashboard.api";
import NotificationCard from "./NotificationCard";

export default function Notification() {
  const { data } = useGetBookingsQuery();

  const bookings = data?.data?.bookings || [];

  return (
    <ScrollArea className="h-[450px] w-full">
      <div className="space-y-5 pt-5 pr-5">
        {bookings.map((booking) => (
          <NotificationCard key={booking.id} booking={booking} />
        ))}
      </div>
    </ScrollArea>
  );
}
