import { Button } from "@/components/animate-ui/components/buttons/button";
import useModal from "@/components/Modal/useModal";
import { cn } from "@/lib/utils";

export default function Filters() {
  const { open, getParams } = useModal();
  const params = getParams("pf") || "last_week";

  const handleFilter = (value: string) => {
    open([
      {
        modalId: "pf",
        openId: value,
      },
    ]);
  };

  return (
    <div className="mt-[11px] flex flex-wrap items-center gap-3">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          className={cn(
            "bg-muted text-foreground cursor-pointer rounded-full text-[10px] font-normal",
            {
              "!bg-primary font-medium !text-white": params === filter.value,
            },
          )}
          size={"sm"}
          onClick={() => handleFilter(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}

const filters = [
  { label: "Week", value: "last_week" },
  { label: "Month", value: "by_month" },
  { label: "Year", value: "by_year" },
];
