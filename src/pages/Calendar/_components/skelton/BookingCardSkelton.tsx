import { Skeleton } from "@/components/ui/skeleton";

export default function BookingCardSkelton() {
  return (
    <div className="border-primary rounded-[24px] border p-4 shadow-[0_1px_11px_0_rgba(218,134,97,0.24)]">
      <div className="flex items-center gap-4 border-b-2 border-gray-200 py-3.5">
        <Skeleton className="z-0 size-[46px] rounded-[4px] border-2" />

        <div className="flex w-full items-center justify-between gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="size-6" />
        </div>
      </div>

      <div className="mt-3.5">
        <p className="flex items-center gap-2 text-sm font-normal">
          <Skeleton className="size-4" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="size-1" />
          <Skeleton className="h-5 w-16" />
        </p>

        <p className="mt-2 line-clamp-1 flex items-center gap-2 text-sm font-normal">
          <Skeleton className="size-4" />
          <Skeleton className="h-5 w-32" />
        </p>

        <Skeleton className="mt-2 h-5 w-24" />
      </div>

      <div className="mx-auto mt-3.5 flex max-w-[250px] items-center justify-between gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
