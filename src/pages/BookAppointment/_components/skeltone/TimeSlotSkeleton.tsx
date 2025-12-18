import { Skeleton } from "@/components/ui/skeleton";

export default function TimeSlotSkeleton() {
  return (
    <div className="mt-5 flex flex-wrap gap-8">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((time) => (
        <Skeleton key={time} className="h-12 w-48 rounded-full p-5 font-bold" />
      ))}
    </div>
  );
}
