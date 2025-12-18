import { Skeleton } from "@/components/ui/skeleton";

export default function CategorySkelton() {
  return (
    <div className="p-4">
      <Skeleton className="h-6 w-1/3 rounded-md" />
      <ul className="mt-2 space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </li>
        ))}
      </ul>
    </div>
  );
}
