import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import useModal from "@/components/Modal/useModal";
import { Badge } from "@/components/ui/badge";
import type { IDue } from "@/types";
import {
  formatDateTimeToDisplay,
  formatFullMonthDate,
} from "@/utils/dateFormate";

interface DueCardProps {
  due: IDue;
}

export default function DueCard({ due }: DueCardProps) {
  const { open } = useModal();

  return (
    <div className="rounded-[12px] p-2.5 shadow-[0_4px_20.5px_0_rgba(0,0,0,0.07)]">
      <div className="flex items-center justify-between">
        <h2 className="line-clamp-1 font-semibold">{due.service}</h2>
        <Badge className="rounded-full bg-[#E6F2E6] px-2.5 py-[6px] text-[10px] text-[#008000]">
          Confirmed
        </Badge>
      </div>

      <div className="mt-2">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-[12px]">
            <span>Invoice : </span>
            <span>{due.invoice_no}</span>
          </p>
          <p className="text-sm font-semibold">Total Due</p>
        </div>

        <div className="my-2 flex items-center justify-between">
          <p className="flex items-center gap-2 text-[12px]">
            <Icon src="/icons/clock.svg" className="text-primary size-4" />
            <span>{formatFullMonthDate(due.date)}</span>
            <Icon src="/icons/ellipse.svg" />
            <span>{formatDateTimeToDisplay(due.requested_at)}</span>
          </p>
          <p className="text-xl font-semibold text-red-500">
            ${due.full_payable_amount}
          </p>
        </div>

        <div>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
            <span className="text-primary">Service : </span>
            <span className="text-muted-foreground line-clamp-1 text-[12px] font-normal">
              {due.service_at}
            </span>
          </p>

          <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <span className="text-primary">Request Amount : </span>
            <span className="text-muted-foreground line-clamp-1 text-[12px] font-normal">
              {due.requested_amount}
            </span>
          </p>
        </div>
      </div>

      <div className="mb-2.5 h-16 rounded-2xl border-none bg-[#EBEBEB] p-2">
        <p className="text-muted-foreground line-clamp-3 text-[10px]">
          Note : {due.note}
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          type="submit"
          className="w-full flex-1 cursor-pointer rounded-[10px]"
          onClick={() =>
            open([
              {
                modalId: "modal",
                openId: "pay-confirmation",
              },
              {
                modalId: "amount",
                openId: btoa(due.requested_amount.toString()),
              },
              {
                modalId: "due_id",
                openId: btoa(due.id.toString()),
              },
            ])
          }
        >
          Pay Requested
        </Button>

        <Button
          type="submit"
          className="w-full flex-1 cursor-pointer rounded-[10px]"
          onClick={() =>
            open([
              {
                modalId: "modal",
                openId: "pay-confirmation",
              },
              {
                modalId: "amount",
                openId: btoa(due.full_payable_amount.toString()),
              },
              {
                modalId: "due_id",
                openId: btoa(due.id.toString()),
              },
              { modalId: "type", openId: "fullpayment" },
            ])
          }
        >
          Full Payment
        </Button>
      </div>
    </div>
  );
}
