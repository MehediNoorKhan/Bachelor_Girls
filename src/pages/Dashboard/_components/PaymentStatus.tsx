import { Button } from "@/components/animate-ui/components/buttons/button";
import { Badge } from "@/components/ui/badge";
import { Shrink } from "lucide-react";
import PaymentChart from "./PaymentChart";

export default function PaymentStatus() {
  return (
    <div className="rounded-[30px] border-2 p-5 shadow-[0_7px_9.3px_0_rgba(234,236,242,0.28)]">
      <div className="flex items-center justify-between">
        <h4 className="bg-primary/20 text-primary rounded-[10px] border-2 p-2.5 text-sm font-bold">
          Payment
        </h4>
        <Button
          variant={"link"}
          size={"icon"}
          className="size-6 cursor-pointer p-0 text-2xl font-bold"
        >
          <Shrink size={24} strokeWidth={3} />
        </Button>
      </div>

      <div className="mt-[14px] flex items-center justify-between">
        <h3 className="text-lg font-bold">Overview</h3>
        <Badge
          className="text-foreground h-6 w-20 rounded-full text-[10px] font-normal"
          variant={"secondary"}
        >
          4.3 Ratings
        </Badge>
      </div>

      <PaymentChart />
    </div>
  );
}
