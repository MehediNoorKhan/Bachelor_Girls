import { Button } from "@/components/animate-ui/components/buttons/button";
import { Badge } from "@/components/ui/badge";
import { useGetDashboardStatsQuery } from "@/store/api/dashboard.api";
import { Shrink } from "lucide-react";
import RevenueChart from "./RevenueChart";

export default function Revenue() {
  const { data } = useGetDashboardStatsQuery();

  const totalBookings = data?.data?.totals?.this_week_bookings || 0;
  const revenue = data?.data?.totals?.this_week_total_revenue || 0.0;

  return (
    <div className="rounded-[30px] border-2 p-5 shadow-[0_7px_9.3px_0_rgba(234,236,242,0.28)]">
      <div className="flex items-center justify-between">
        <h4 className="bg-primary/20 text-primary rounded-[10px] border-2 p-2.5 text-sm font-bold">
          Revenue
        </h4>
        <Button
          variant={"link"}
          size={"icon"}
          className="size-6 cursor-pointer p-0 text-2xl font-bold"
        >
          <Shrink size={24} strokeWidth={3} />
        </Button>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Notifications</h3>
          <Badge
            className="text-foreground h-6 w-20 rounded-full text-[10px] font-normal"
            variant={"secondary"}
          >
            Current Week
          </Badge>
        </div>

        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          <Badge
            variant={"outline"}
            className="bg-muted flex w-full flex-1 items-center gap-4 rounded-[10px] px-4 py-3"
          >
            <span className="text-2xl font-medium">Total Booking </span>
            <span className="text-2xl font-extrabold">{totalBookings}</span>
          </Badge>

          <Badge
            variant={"outline"}
            className="bg-muted flex w-full flex-1 items-center gap-4 rounded-[10px] px-4 py-3"
          >
            <span className="text-2xl font-medium">Revenue </span>
            <span className="text-2xl font-extrabold">
              ${revenue.toFixed(2)}
            </span>
          </Badge>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <h3 className="text-lg font-bold">Total Revenue</h3>
        <Badge
          className="text-foreground h-6 w-20 rounded-full text-[10px] font-normal"
          variant={"secondary"}
        >
          Current Week
        </Badge>
      </div>
      <RevenueChart />
    </div>
  );
}
