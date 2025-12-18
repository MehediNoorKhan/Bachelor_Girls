import { Button } from "@/components/animate-ui/components/buttons/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RevenueChart from "./RevenueChart";

export default function RevenueTab() {
  return (
    <>
      <div className="mt-[47px] flex w-full items-center justify-between">
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

      <div className="mt-[27px] flex flex-col gap-5 sm:flex-row md:flex-col lg:flex-row">
        <Badge
          variant={"outline"}
          className="bg-muted flex w-full flex-1 items-center gap-4 rounded-[10px] px-4 py-3"
        >
          <span className="text-xl font-medium md:text-2xl">New</span>
          <span className="text-xl font-extrabold md:text-2xl">$1,250.00</span>
        </Badge>

        <Badge
          variant={"outline"}
          className="bg-muted flex w-full flex-1 items-center gap-4 rounded-[10px] px-4 py-3"
        >
          <span className="text-xl font-medium md:text-2xl">Rescheduled</span>
          <span className="text-xl font-extrabold md:text-2xl">$1,250.00</span>
        </Badge>
      </div>

      <div className="mt-[44.5px] flex w-full items-center justify-between">
        <h3 className="text-[22px] font-bold sm:text-[26px]">Total Revenue</h3>

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

      <div className="mt-5">
        <RevenueChart />
        <div className="flex w-full justify-end">
          <Button
            size={"lg"}
            className="h-11 w-full cursor-pointer rounded-[14px] text-xl leading-[120%] font-semibold max-sm:mt-5 sm:w-fit"
          >
            Download PDF File
          </Button>
        </div>
      </div>
    </>
  );
}
