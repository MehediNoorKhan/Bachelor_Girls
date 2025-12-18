import Icon from "@/components/Icon";
import { Badge } from "@/components/ui/badge";
import type { IBooking } from "@/types";
import { formatBookingDate, formatBookingTime } from "@/utils/dateFormate";

export default function CanceledCard({ booking }: { booking: IBooking }) {
  return (
    <div className="bg-muted rounded-[12px] px-5 py-2.5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm">
          <Icon src="/icons/clock.svg" className="text-primary size-4" />

          <span>{formatBookingDate(booking.date)}</span>
          <Icon src="/icons/ellipse.svg" className="text-primary size-2" />
          <span>{formatBookingTime(booking.time)}</span>
        </p>
        <Badge className="rounded-full border border-[#FFB0B0] bg-[#FFE6E6] px-2.5 py-[6px] text-[10px] text-[#FF0000]">
          Cancel
        </Badge>
      </div>
      <h3 className="mt-2 line-clamp-1 text-lg font-bold">
        {booking.service.title}
      </h3>
    </div>
  );
}
