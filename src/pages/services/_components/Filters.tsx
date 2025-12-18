import { cn } from "@/lib/utils";
import { Settings2 } from "lucide-react";
import Categories from "./Categories";
import PriceRange from "./PriceRange";

export default function Filters({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-muted h-fit w-full flex-col rounded-[20px] border md:max-w-[306px] md:flex-row",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between gap-4 border-b px-4 pt-5 pb-[10px]">
        <h1 className="text-2xl font-medium">Filter</h1>
        <Settings2 />
      </div>
      <Categories />
      <PriceRange />
    </div>
  );
}
