import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewSkeleton() {
  return (
    <section className="mt-[70px]">
      <div className="container mx-auto max-2xl:px-2">
        <Skeleton className="h-8 w-1/4 rounded-lg" />

        <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border px-2.5 py-5 shadow-[0_7px_9.3px_0_rgba(234,236,242,0.28)]"
            >
              <div className="mb-3 flex justify-between">
                <Skeleton className="h-6 w-6" />

                <span className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="inline-block h-4 w-4" />
                  ))}
                </span>
              </div>
              <Skeleton className="mb-2 h-4 w-full" />
              <hr className="my-2.5" />

              <div className="flex items-center justify-between gap-2">
                <Skeleton className="size-10 rounded-full" />
                <div className="w-32 md:w-64">
                  <Skeleton className="h-4 w-full" />

                  <Skeleton className="mt-1 h-3 w-3/4" />
                </div>

                <div className="gap flex items-center">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
