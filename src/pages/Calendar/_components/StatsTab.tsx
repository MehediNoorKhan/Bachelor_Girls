import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import useModal from "@/components/Modal/useModal";
import { cn } from "@/lib/utils";
import { CalendarClock, X } from "lucide-react";
import StatsChart from "./StatsChart";

export default function StatsTab() {
  const { open, getParams } = useModal();
  const active = getParams("filter") || "today";

  const handleFilterChange = (value: string) => {
    open([{ modalId: "filter", openId: value }]);
  };

  return (
    <div>
      <div className="mt-[52px] flex gap-4">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={"secondary"}
            className={cn(
              "text-accent-foreground cursor-pointer rounded-[16px] text-sm font-bold",
              {
                "!bg-primary !text-white": active === filter.value,
              },
            )}
            onClick={() => handleFilterChange(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <StatsChart />

      <div>
        <h3 className="text-[22px] font-bold sm:text-[26px]">Stats Overview</h3>
        <div className="mt-[27px] grid gap-4 sm:grid-cols-[repeat(4,353px)]">
          <div className="bg-muted flex items-center justify-between rounded-[12px] border px-3 py-4 sm:py-6">
            <h4 className="flex items-center gap-4">
              <span className="rounded-[8px] border p-2.5">
                <Icon
                  src="/icons/add-placeholder.svg"
                  className="size-7 sm:size-9"
                />
              </span>
              <span className="text-xl font-medium sm:text-2xl">New</span>
            </h4>

            <h4 className="text-primary text-3xl font-extrabold sm:text-4xl">
              50
            </h4>
          </div>

          <div className="bg-muted flex items-center justify-between rounded-[12px] border px-3 py-4 sm:py-6">
            <h4 className="flex items-center gap-4">
              <span className="rounded-[8px] border p-2.5">
                <X strokeWidth={1.5} className="text-primary" />
              </span>
              <span className="text-xl font-medium sm:text-2xl">New</span>
            </h4>

            <h4 className="text-primary text-3xl font-extrabold sm:text-4xl">
              10
            </h4>
          </div>

          <div className="bg-muted flex items-center justify-between rounded-[12px] border px-3 py-4 sm:py-6">
            <h4 className="flex items-center gap-4">
              <span className="rounded-[8px] border p-2.5">
                <CalendarClock strokeWidth={1.5} className="text-primary" />
              </span>
              <span className="text-xl font-medium sm:text-2xl">New</span>
            </h4>

            <h4 className="text-primary text-3xl font-extrabold sm:text-4xl">
              50
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

const filters = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Week",
    value: "week",
  },
  {
    label: "Month",
    value: "month",
  },
  {
    label: "Year",
    value: "year",
  },
  {
    label: "Quarter",
    value: "quarter",
  },
];
