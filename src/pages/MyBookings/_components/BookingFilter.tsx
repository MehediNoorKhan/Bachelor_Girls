import { Button } from "@/components/animate-ui/components/buttons/button";
import { SheetClose } from "@/components/animate-ui/components/radix/sheet";
import useModal from "@/components/Modal/useModal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

export default function BookingFilter() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { open, getParams } = useModal();
  const params = getParams("filter");
  const handleFilter = (filter: string) => {
    open([
      {
        modalId: "filter",
        openId: filter,
      },
    ]);
  };

  useEffect(() => {
    if (!params) {
      open([
        {
          modalId: "filter",
          openId: "pending",
        },
      ]);
    }
  }, [open, params]);

  return (
    <div className="space-y-5">
      {filters.map((filter) => {
        const isActive = params === filter.id;

        if (isMobile) {
          return (
            <SheetClose asChild key={filter.id}>
              <Button
                variant={isActive || !filter ? "secondary" : "outline"}
                size={"lg"}
                className={cn(
                  "flex h-12 w-full items-center justify-between gap-2 rounded-lg border-none bg-white text-lg shadow-none",
                  {
                    "bg-primary hover:text-muted-foreground text-white":
                      isActive || !filter,
                  },
                )}
                onClick={() => handleFilter(filter.id)}
              >
                <span> {filter.label}</span> <ChevronRight size={24} />
              </Button>
            </SheetClose>
          );
        }

        return (
          <Button
            key={filter.id}
            variant={isActive || !filter ? "secondary" : "outline"}
            size={"lg"}
            className={cn(
              "flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border-none bg-white text-lg shadow-none",
              {
                "bg-primary hover:text-muted-foreground text-white":
                  isActive || !filter,
              },
            )}
            onClick={() => handleFilter(filter.id)}
          >
            <span> {filter.label}</span> <ChevronRight size={24} />
          </Button>
        );
      })}
    </div>
  );
}

const filters = [
  { label: "Upcoming Bookings", id: "pending" },
  { label: "Reschedule Bookings", id: "rescheduled" },
  { label: "Favorite Bookings", id: "favorite-bookings" },
  { label: "Booking History", id: "booking-history" },
  { label: "Canceled", id: "cancelled" },
  { label: "Reschedule Request List", id: "reschedule-request-list" },
];
