import { cn } from "@/lib/utils";
import { useAvailableTimeSlotsQuery } from "@/store/api/serviceApi";
import { formatTimeTo12Hour } from "@/utils/dateFormate";
import { useParams } from "react-router";
import { Button } from "./animate-ui/components/buttons/button";
import SectionErrors from "./errors/SectionErrors";
import useModal from "./Modal/useModal";
import TimeSlotSkeleton from "./skeltone/TimeSlotSkeleton";

export default function SelectTime() {
  const { open, getParams } = useModal();

  const selectedDate = getParams("date");
  const selectedTime = getParams("time");
  const { serviceId } = useParams();

  const { data, isLoading, isError } = useAvailableTimeSlotsQuery({
    service_id: serviceId ? Number(serviceId) : 0,
    // selected date or today's date
    date: selectedDate || new Date().toISOString().split("T")[0],
  });

  const timeSlots = data?.data || [];

  return (
    <div>
      <h2 className="mt-[70px] text-[22px] font-semibold">
        Available Time Slots:
      </h2>
      <div className="mt-5 flex flex-wrap gap-8">
        {!isError && isLoading && <TimeSlotSkeleton />}
        {isError && !isLoading && <SectionErrors />}
        {!isError && !isLoading && timeSlots.length === 0 && (
          <div className="text-muted-foreground">No available time slots</div>
        )}

        {!isError &&
          timeSlots.map((time) => (
            <Button
              type="button"
              key={time.id}
              variant={"secondary"}
              className={cn(
                "text-muted-foreground h-12 w-full max-w-48 cursor-pointer rounded-full p-5 font-bold max-[440px]:flex-1",
                {
                  "!bg-primary !text-white":
                    selectedTime === time.id.toString(),
                },
              )}
              onClick={() =>
                open([
                  {
                    modalId: "time",
                    openId: time.id.toString(),
                  },
                ])
              }
              disabled={time.disable}
              title={time.message || "Available"}
            >
              {formatTimeTo12Hour(time.time)}
            </Button>
          ))}
      </div>
    </div>
  );
}
