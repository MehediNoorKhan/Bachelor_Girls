import { Button } from "@/components/animate-ui/components/buttons/button";
import DateSelect from "@/components/DateSelect";
import SectionErrors from "@/components/errors/SectionErrors";
import Icon from "@/components/Icon";
import useModal from "@/components/Modal/useModal";
import { cn } from "@/lib/utils";
import { useAvailableTimeSlotsQuery } from "@/store/api/serviceApi";
import { formatTimeTo12Hour } from "@/utils/dateFormate";
import { useParams } from "react-router";
import TimeSlotSkeleton from "./skeltone/TimeSlotSkeleton";

export default function SelectDateAndTime() {
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
    <section className="mt-[70px]">
      <div className="container mx-auto max-2xl:px-4">
        <h2 className="text-[22px] font-semibold">Select Date :</h2>
        <DateSelect />

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

        <hr className="mt-5 mb-10" />
        <Button
          disabled={!selectedDate || !selectedTime}
          className="flex h-12 w-full cursor-pointer items-center rounded-full p-5 md:max-w-[418px]"
          onClick={() =>
            open([
              {
                modalId: "modal",
                openId: "booking-confirmation",
              },
            ])
          }
        >
          <span>Confirm</span> <Icon src="/icons/long-arrow-right.svg" />
        </Button>
      </div>
    </section>
  );
}
