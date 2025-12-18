import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Button } from "./animate-ui/components/buttons/button";
import useModal from "./Modal/useModal";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function DateSelect({ day = 13 }: { day?: number }) {
  const { open, getParams } = useModal();
  const selectedDate = getParams("date");

  const dates = Array.from({ length: day }).map((_, idx) => {
    const date = new Date();
    date.setDate(date.getDate() + idx);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.toISOString().split("T")[0], // This will give you YYYY-MM-DD format
    };
  });

  useEffect(() => {
    if (!selectedDate) {
      open([
        {
          modalId: "date",
          openId: dates[0].date,
        },
      ]);
    }
  }, [selectedDate, open, dates]);

  return (
    <ScrollArea>
      <div className="flex justify-between gap-6 py-4 md:mt-5">
        {dates.map((item) => (
          <Button
            type="button"
            key={item.date}
            variant={"ghost"}
            size={"icon"}
            className={cn(
              "text-muted-foreground flex h-fit w-16 cursor-pointer flex-col rounded-2xl px-2 py-2.5 text-2xl font-normal",
              {
                "!text-primary !bg-[#FFEEF3]": selectedDate === item.date,
              },
            )}
            onClick={() => open([{ modalId: "date", openId: item.date }])}
          >
            <span className="block">{item.day}</span>
            <span
              className={cn("grid size-10 place-content-center rounded-full", {
                "!bg-primary !text-white !shadow-[0_2px_3px_0_rgba(0,0,0,0.17),0_0_3px_0_rgba(0,0,0,0.08)]":
                  selectedDate === item.date,
              })}
            >
              {item.date.split("-")[item.date.split("-").length - 1]}
            </span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
