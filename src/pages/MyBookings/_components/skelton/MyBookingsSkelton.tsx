import { Skeleton } from "@/components/ui/skeleton";

export default function MyBookingsSkelton() {
  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[12px] py-5 shadow-[0_4px_20.5px_0_rgba(0,0,0,0.07)]"
        >
          <div className="border-primary border-l-4 pl-5">
            <Skeleton className="h-5 w-1/2 border-b pb-1" />

            <div className="mt-[15px] pr-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="size-5 rounded-full" />

                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className="h-4 w-1/4" />
              </div>

              <div className="mt-[5px] ml-0.5 flex items-center gap-2 text-sm font-normal">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-4 w-1/4" />
              </div>

              <div className="mt-[15px] flex justify-between gap-5">
                <Skeleton className="h-8 w-1/2 rounded-full" />
                <Skeleton className="h-8 w-1/2 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
