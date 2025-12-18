import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Booking } from "@/types";
import { formatBookingDate, formatTimeTo12Hour } from "@/utils/dateFormate";
import ConfirmBooking from "./ConfirmBooking";
import RejectBooking from "./RejectBooking";

export default function NotificationCard({ booking }: { booking: Booking }) {
  return (
    <div className="border-primary rounded-[10px] border-2 p-2.5 shadow-[0_1px_11px_0_rgba(218,134,97,0.24)]">
      <div className="flex items-center gap-4 border-b-2 border-gray-200 py-2.5">
        <Avatar className="size-[46px] rounded-[4px] border-2">
          <AvatarImage src={booking?.customer?.avatar} />
          <AvatarFallback>
            {booking?.customer?.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex w-full items-center justify-between gap-4">
          <h3 className="text-base font-bold">{booking?.customer?.name}</h3>
          <Icon src="/icons/add-placeholder.svg" />
        </div>
      </div>

      <div className="mt-2">
        <p className="flex items-center gap-2 text-sm font-normal">
          <Icon src="/icons/clock-bold.svg" className="text-primary size-4" />
          <span>{formatBookingDate(booking.date)}</span>
          <Icon src="/icons/ellipse.svg" className="text-primary size-1" />
          <span>{formatTimeTo12Hour(booking.time)}</span>
        </p>

        <p className="mt-2 line-clamp-1 flex items-center gap-2 text-sm font-normal">
          <Icon src="/icons/map.svg" className="text-primary size-4" />
          <span>Location : "N/A"</span>
        </p>
      </div>

      <div className="mt-2 flex items-center gap-4 max-2xl:justify-between">
        <RejectBooking bookingId={booking.id} />
        <ConfirmBooking bookingId={booking.id} />
      </div>
    </div>
  );
}
