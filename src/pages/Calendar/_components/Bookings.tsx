import { Button } from "@/components/animate-ui/components/buttons/button";
import SectionErrors from "@/components/errors/SectionErrors";
import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConfirmBooking from "@/pages/Dashboard/_components/ConfirmBooking";
import RejectBooking from "@/pages/Dashboard/_components/RejectBooking";
import { useGetBookingsQuery } from "@/store/api/dashboard.api";
import { formatBookingDate, formatTimeTo12Hour } from "@/utils/dateFormate";
import BookingCardSkelton from "./skelton/BookingCardSkelton";

export default function Bookings() {
  const { data, isLoading, isError } = useGetBookingsQuery();

  if (isLoading) {
    return (
      <div className="mt-2 grid gap-4 sm:grid-cols-[repeat(4,353px)]">
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <BookingCardSkelton key={index} />
          ))}
      </div>
    );
  }

  if (isError) {
    return <SectionErrors />;
  }

  const bookings = data?.data?.bookings || [];

  return (
    <div className="mt-[40px]">
      <h3 className="text-[26px] font-bold">Bookings</h3>

      <div className="mt-2 grid gap-4 sm:grid-cols-[repeat(4,353px)]">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="border-primary rounded-[24px] border p-4 shadow-[0_1px_11px_0_rgba(218,134,97,0.24)]">
              <div className="flex items-center gap-4 border-b-2 border-gray-200 py-3.5">
                <Avatar className="z-0 size-[46px] rounded-[4px] border-2">
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
                  <h3 className="text-base font-bold">
                    {booking?.customer?.name}
                  </h3>
                  <Icon src="/icons/add-placeholder.svg" />
                </div>
              </div>

              <div className="mt-3.5">
                <p className="flex items-center gap-2 text-sm font-normal">
                  <Icon
                    src="/icons/clock-bold.svg"
                    className="text-primary size-4"
                  />
                  <span>{formatBookingDate(booking.date)}</span>
                  <Icon
                    src="/icons/ellipse.svg"
                    className="text-primary size-1"
                  />
                  <span>{formatTimeTo12Hour(booking.time)}</span>
                </p>

                <p className="mt-2 line-clamp-1 flex items-center gap-2 text-sm font-normal">
                  <Icon src="/icons/map.svg" className="text-primary size-4" />
                  <span>Location : {booking?.service?.location || "N/A"}</span>
                </p>

                <Button variant="link" className="text-primary cursor-pointer">
                  Or Tap Here To Reschedule
                </Button>
              </div>

              <div className="mx-auto mt-3.5 flex max-w-[250px] items-center justify-between gap-4">
                <RejectBooking bookingId={booking.id} />
                <ConfirmBooking bookingId={booking.id} />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
}
