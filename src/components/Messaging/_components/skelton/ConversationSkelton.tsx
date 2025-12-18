import { Skeleton } from "@/components/ui/skeleton";

export default function ConversationSkelton() {
  return (
    <div className="mt-4 h-[500px] space-y-4 rounded-md border border-none pr-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <button
          key={index}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] bg-[#F0F1F4] p-[14px]"
        >
          <Skeleton className="size-[51px] rounded-full" />
          <div className="w-full space-y-1">
            <div className="flex w-full justify-between">
              <Skeleton className="h-4 w-1/3 rounded" />
              <Skeleton className="h-4 w-1/4 rounded" />
            </div>
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>
        </button>
      ))}
    </div>
  );
}
