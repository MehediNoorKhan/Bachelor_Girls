import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import { Badge } from "@/components/ui/badge";

export default function RescheduleCard() {
  return (
    <div className="bg-muted rounded-[12px] px-5 py-2.5">
      <Button
        variant={"link"}
        size={"icon"}
        className="ml-auto block cursor-pointer"
      >
        <Icon src="/icons/close-square.svg" className="size-5" />
      </Button>

      <div className="mt-2.5 flex items-center justify-between">
        <p className="text-sm">March 10, 2025</p>
        <Badge className="rounded-[12px] bg-[#F3EAE7] px-2.5 py-[6px] text-[#DA8661]">
          Reschedule
        </Badge>
      </div>
      <h3 className="mt-4 text-lg font-bold">Facial Treatment</h3>

      <Button className="mt-4 w-full rounded-full text-xs font-medium">
        <span>Approve</span>
        <Icon src="/icons/chevron-right.svg" className="size-[18px]" />
      </Button>
    </div>
  );
}
