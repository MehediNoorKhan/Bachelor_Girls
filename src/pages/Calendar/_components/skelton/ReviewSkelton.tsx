import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewSkelton() {
  return (
    <div>
      <div className="mt-[47px] flex w-full items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-20 rounded" />
        </div>
      </div>

      <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border px-2.5 py-5 shadow-[0_7px_9.3px_0_rgba(234,236,242,0.28)]"
          >
            <div className="mb-3 flex justify-between">
              <Skeleton className="h-6 w-6" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, starIndex) => (
                  <Skeleton key={starIndex} className="h-4 w-4" />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-3/5" />
            </div>

            <hr className="my-2.5" />

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                <Skeleton className="size-10 rounded-full" />
                <div className="w-32 space-y-1 md:w-64">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
