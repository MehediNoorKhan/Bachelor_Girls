import Icon from "@/components/Icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDashboardStatsQuery } from "@/store/api/dashboard.api";
import HomeServiceSkelton from "./skelton/HomeServiceSkelton";

export default function HomeService() {
  const { data, isLoading, isError } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <HomeServiceSkelton />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const totalBookings = data?.data?.totals?.new_bookings || 0;
  const cancelBookings = data?.data?.totals?.cancelled || 0;
  const rescheduleBookings = data?.data?.totals?.rescheduled || 0;

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-[22px] font-bold sm:text-[26px]">Home Services</h3>

        <Select>
          <SelectTrigger className="text-foreground bg-muted w-[132px] cursor-pointer rounded-full border-none">
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Today</SelectItem>
            <SelectItem value="dark">Tomorrow</SelectItem>
            <SelectItem value="system">This Week</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-[27px] grid gap-4 sm:grid-cols-[repeat(4,353px)]">
        <div className="bg-muted flex items-center justify-between rounded-[12px] border px-3 py-4 sm:py-6">
          <h4 className="flex items-center gap-4">
            <Icon src="/icons/new post.svg" className="size-7 sm:size-9" />
            <span className="text-xl font-medium sm:text-2xl">New</span>
          </h4>

          <h4 className="text-3xl font-extrabold sm:text-4xl">
            {totalBookings}
          </h4>
        </div>

        <div className="bg-muted flex items-center justify-between rounded-[12px] border px-3 py-4 sm:py-6">
          <h4 className="flex items-center gap-4">
            <Icon src="/icons/cancel.svg" className="size-7 sm:size-9" />
            <span className="text-xl font-medium sm:text-2xl">Cancel</span>
          </h4>

          <h4 className="text-3xl font-extrabold sm:text-4xl">
            {cancelBookings}
          </h4>
        </div>

        <div className="bg-muted flex items-center justify-between rounded-[12px] border px-3 py-4 sm:py-6">
          <h4 className="flex items-center gap-4">
            <Icon src="/icons/schedule.svg" className="size-7 sm:size-9" />
            <span className="text-xl font-medium sm:text-2xl">Reschedule</span>
          </h4>

          <h4 className="text-3xl font-extrabold sm:text-4xl">
            {rescheduleBookings}
          </h4>
        </div>
      </div>
    </>
  );
}
