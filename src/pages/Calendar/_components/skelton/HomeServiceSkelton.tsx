import { Skeleton } from "@/components/ui/skeleton";

export default function HomeServiceSkelton() {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <div className="mt-[27px] grid gap-4 sm:grid-cols-[repeat(4,353px)]">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-muted flex items-center justify-between rounded-[12px] border px-3 py-4 sm:py-6"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="size-7 sm:size-9" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-16" />
          </div>
        ))}
      </div>
    </>
  );
}
