import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import useModal from "@/components/Modal/useModal";
import type { DueRequestListItem } from "@/types";
import CancelRequest from "./CancelRequest";

interface DueCardProps {
  due: DueRequestListItem;
}

export default function RequestDueCard({ due }: DueCardProps) {
  const { open } = useModal();

  return (
    <div className="border-primary rounded-[26px] border-2 py-4">
      <div className="flex items-center justify-between px-4">
        {/* <h2 className="text-base font-semibold">{due.}</h2> */}
        {/* <Badge
          variant="default"
          className={cn(
            "rounded-full bg-[#E6F2E6] text-[10px] font-medium text-[#008000] capitalize",
            due.status === "completed" && "bg-[#E6F2E6] text-[#008000]",
            due.status === "pending" && "bg-[#FFF4E5] text-[#FF8C00]",
            due.status === "cancelled" && "bg-[#FFE5E5] text-[#FF0000]",
          )}
        >
          {due.status}
        </Badge> */}
      </div>

      <div className="mt-[11px] flex items-center justify-between px-4">
        <p className="text-[12px] font-normal">Invoice: {due.invoice_no}</p>
        <p className="text-sm font-semibold">Total Payable</p>
      </div>

      <div className="mt-[9.5px] flex items-center justify-between px-4">
        <p className="flex items-center gap-2 text-sm font-normal">
          <Icon src="/icons/clock-bold.svg" className="text-primary size-3" />
          <span>{due.date}</span>
          <Icon src="/icons/ellipse.svg" className="size-1" />
          <span>{due.timeSlot}</span>
        </p>
        <p className="text-xl font-semibold text-[#FF0000]">{due.due}</p>
      </div>

      <ul className="bg-primary/30 mt-3 space-y-1.5 px-4 py-1.5">
        <li className="text-sm font-normal">
          <span className="text-primary font-medium">Service : </span>
          <span>{due.service}</span>
        </li>
        <li className="text-sm font-normal">
          <span className="text-primary font-medium">Service At : </span>
          <span>{due.service_at}</span>
        </li>
        <li className="text-sm font-normal">
          <span className="text-primary font-medium">Already Requested : </span>
          <span>{due.already_requested}</span>
        </li>
      </ul>

      <div className="mt-2 flex items-center justify-between px-4">
        <CancelRequest id={due.id.toString()} />
        <Button
          size={"lg"}
          className="cursor-pointer rounded-[10px] border-none"
          onClick={() =>
            open([
              {
                modalId: "modal",
                openId: "custom-request",
              },
              {
                modalId: "id",
                openId: due.id.toString(),
              },
            ])
          }
        >
          Request to pay
        </Button>
      </div>
    </div>
  );
}
