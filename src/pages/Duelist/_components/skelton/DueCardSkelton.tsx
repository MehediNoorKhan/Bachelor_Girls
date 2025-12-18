import { Skeleton } from "@/components/ui/skeleton";

export default function DueCardSkeleton() {
  return (
    <div className="border-primary rounded-[26px] border-2 py-4">
      <div className="flex items-center justify-between px-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      <div className="mt-[11px] flex items-center justify-between px-4">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>

      <div className="mt-[9.5px] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-3" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="size-1 rounded-full" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>

      <div className="bg-primary/30 mt-3 space-y-1.5 px-4 py-1.5">
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 px-4">
        <Skeleton className="h-10 w-32 rounded-[10px]" />
        <Skeleton className="h-10 w-32 rounded-[10px]" />
      </div>
    </div>
  );
}
