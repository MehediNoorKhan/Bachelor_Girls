import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function MessageSkelton() {
  return (
    <div className="space-y-4 py-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className={cn("bg-muted max-w-[350px] rounded-[10px] p-[14px]", {
            "ml-auto bg-[#F4D9CE]": idx % 2 === 0,
          })}
        >
          <Skeleton className="mb-2 h-4 w-3/4 rounded" />
          <span className="text-muted-foreground text-[12px] font-normal">
            <Skeleton className="h-4 w-1/4 rounded" />
          </span>
        </div>
      ))}
    </div>
  );
}
