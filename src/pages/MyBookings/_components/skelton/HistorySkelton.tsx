import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryCardSkelton() {
  return (
    <div>
      <h1 className="text-2xl font-semibold capitalize md:text-[28px]">
        Booking History
      </h1>

      <div className="mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-muted rounded-[12px] px-5 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20 rounded-[12px]" />
            </div>
            <Skeleton className="mt-2 h-5 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
