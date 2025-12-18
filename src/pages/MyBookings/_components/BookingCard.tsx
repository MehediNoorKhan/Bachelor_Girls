import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import useModal from "@/components/Modal/useModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { IBooking } from "@/types";
import { formatBookingDate } from "@/utils/dateFormate";
import { Link } from "react-router";

interface BookingCardProps {
  booking: IBooking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const { open } = useModal();

  return (
    <div className="rounded-[12px] py-5 shadow-[0_4px_20.5px_0_rgba(0,0,0,0.07)]">
      <div className="border-primary border-l-4 pl-5">
        <h2 className="line-clamp-1 border-b pb-1 text-base font-semibold">
          {booking.service.title}
        </h2>

        <div className="mt-[15px] pr-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar className="size-5">
                <AvatarImage src={booking.customer.avatar} />
                <AvatarFallback>
                  {booking.customer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-sm font-semibold">{booking.customer.name}</h3>
            </div>

            <span
              className={cn("text-[10px] font-semibold", {
                "text-green-500": booking.status === "pending",
                "text-yellow-500": booking.status === "rescheduled",
              })}
            >
              {status[booking.status as keyof typeof status]?.label || "N/A"}
            </span>
          </div>

          <div className="mt-[5px] ml-0.5 flex items-center gap-2 text-sm font-normal">
            <Icon src="/icons/clock-bold.svg" className="size-[14px]" />
            <span>{formatBookingDate(booking.date)}</span>
            <Icon src="/icons/ellipse.svg" className="size-[6px]" />
          </div>

          <div className="mt-[15px] flex justify-between gap-5">
            <Button
              variant={"secondary"}
              size={"sm"}
              className="flex-1 cursor-pointer rounded-full"
              onClick={() =>
                open([
                  { modalId: "modal", openId: "cancel-booking" },
                  { modalId: "bookingId", openId: booking.id.toString() },
                ])
              }
            >
              Cancel
            </Button>
            <Link
              to={`/reschedule/${booking.service.id}/${booking.owner.id}/${booking.id}`}
              className="flex-1"
            >
              <Button
                variant={"secondary"}
                size={"sm"}
                className="w-full cursor-pointer rounded-full"
              >
                Reschedule
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const status = {
  pending: {
    label: "Upcoming",
    color: "text-green-500",
  },
  rescheduled: {
    label: "Reschedule",
    color: "text-yellow-500",
  },
};
