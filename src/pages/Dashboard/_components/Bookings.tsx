import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import { useGetDashboardStatsQuery } from "@/store/api/dashboard.api";
import { Shrink } from "lucide-react";
import { Link } from "react-router";
import Notification from "./Notification";

export default function Bookings() {
  const { data } = useGetDashboardStatsQuery();

  const totalBookings = data?.data?.totals?.new_bookings || 0;
  const cancelBookings = data?.data?.totals?.cancelled || 0;
  const rescheduleBookings = data?.data?.totals?.rescheduled || 0;

  return (
    <div className="rounded-[30px] border-2 py-5 shadow-[0_7px_9.3px_0_rgba(234,236,242,0.28)]">
      <div className="flex items-center justify-between px-5">
        <h4 className="bg-primary/20 text-primary rounded-[10px] border-2 p-2.5 text-sm font-bold">
          Bookings
        </h4>
        <Button
          variant={"link"}
          size={"icon"}
          className="size-6 cursor-pointer p-0 text-2xl font-bold"
        >
          <Shrink size={24} strokeWidth={3} />
        </Button>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="mt-8 w-full space-y-4 pl-5 sm:max-w-[197px]">
          <Link
            to="/bookings"
            className="bg-muted block rounded-[10px] border px-3 py-4"
          >
            <span className="text-2xl font-medium">New</span>
            <span className="mt-2.5 flex items-center justify-between">
              <Icon src="/icons/new post.svg" className="size-9" />
              <span className="text-4xl font-extrabold">{totalBookings}</span>
            </span>
          </Link>

          <Link
            to="/bookings"
            className="bg-muted block rounded-[10px] border px-3 py-4"
          >
            <span className="text-2xl font-medium">Cancel</span>
            <span className="mt-2.5 flex items-center justify-between">
              <Icon src="/icons/cancel.svg" className="size-9" />
              <span className="text-4xl font-extrabold">{cancelBookings}</span>
            </span>
          </Link>

          <Link
            to="/bookings"
            className="bg-muted block rounded-[10px] border px-3 py-4"
          >
            <span className="text-2xl font-medium">Reschedule</span>
            <span className="mt-2.5 flex items-center justify-between">
              <Icon src="/icons/schedule.svg" className="size-9" />
              <span className="text-4xl font-extrabold">
                {rescheduleBookings}
              </span>
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between pr-5">
            <h3 className="text-lg font-bold">Notifications</h3>
            <Link to="/notifications">See all</Link>
          </div>

          <Notification />
        </div>
      </div>
    </div>
  );
}
