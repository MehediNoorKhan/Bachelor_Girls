import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { IBookingHistory } from "@/types";
import { formatFullMonthDate } from "@/utils/dateFormate";

interface HistoryCardProps {
  history: IBookingHistory;
}

export default function HistoryCard({ history }: HistoryCardProps) {
  return (
    <div className="bg-muted rounded-[12px] px-5 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm">{formatFullMonthDate(history.date)}</p>
        <Badge
          className={cn(
            "rounded-[12px] px-2.5 py-[6px] text-sm font-bold capitalize",
            {
              "bg-[#E4EFDE] text-[#47B308]": history.status === "confirmed",
              "bg-[#F3EEDD] text-[#D8A500]": history.status === "pending",
              "bg-[#F6DDDD] text-[#FF0000]": history.status === "cancelled",
              "bg-[#F6E8E4] text-[#FF7045]": history.status === "rescheduled",
            },
          )}
        >
          {history.status}
        </Badge>
      </div>
      <h3 className="line-clamp-1 text-lg font-bold">{history.title}</h3>
    </div>
  );
}
