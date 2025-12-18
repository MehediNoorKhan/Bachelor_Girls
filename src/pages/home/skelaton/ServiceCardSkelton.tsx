import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceCardSkelton() {
  return (
    <div className="rounded-2xl p-5 shadow-[0_0_20px_0_rgba(0,0,0,0.1)] hover:shadow-[0_1px_10px_0_rgba(0,0,0,0.25)] dark:shadow-[0_0px_15px_0_var(--primary)]/30">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className="h-[92px] w-[92px] rounded-full md:h-32 md:w-32" />

        <div className="flex items-center gap-5">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="size-[34px] rounded-full" />
        </div>
      </div>

      <Skeleton className="mt-5 h-6 w-3/4" />

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-[3px]">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-20" />
        </div>

        <span className="text-muted-foreground flex items-center gap-1 text-sm">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-8" />
        </span>
      </div>
      <Skeleton className="mt-4 h-2 w-full max-w-48" />

      {/* <span className="text-success text-sm">Instant Booking available</span> */}
      <hr className="border-muted mt-4 mb-2 border-1" />
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-end gap-[5px]">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="mb-1 h-4 w-6" />
          </div>
          <Skeleton className="mt-2 h-2 w-20" />
        </div>

        <Skeleton className="h-9 w-full max-w-36 rounded-full" />
      </div>
    </div>
  );
}
