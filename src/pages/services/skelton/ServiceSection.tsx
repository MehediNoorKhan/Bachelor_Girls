import { Skeleton } from "@/components/ui/skeleton";
import ServiceCardSkelton from "@/pages/home/skelaton/ServiceCardSkelton";
import CategorySkelton from "./CategorySkelton";

export default function ServiceSection() {
  return (
    <section>
      <div className="container mx-auto space-y-6 max-xl:px-2">
        <Skeleton className="my-10 h-10 w-1/3 rounded-lg" />
        <div className="flex gap-6">
          <div className="bg-muted h-fit w-full flex-col rounded-[20px] border md:max-w-[306px] md:flex-row">
            <div className="flex w-full items-center justify-between gap-4 border-b px-4 pt-5 pb-[10px]">
              <Skeleton className="h-8 w-1/3 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <CategorySkelton />
            <div className="space-y-4 p-4">
              <Skeleton className="h-5 w-2/3" />
              <div className="mt-4 flex items-center gap-2">
                <Skeleton className="h-8 w-full rounded-lg" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Skeleton className="h-8 w-full rounded-full" />
                <Skeleton className="size-8 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <div className="bg-muted col-span-full flex items-center justify-between rounded-xl p-4">
                <Skeleton className="h-8 w-1/3 rounded-lg" />

                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-1/3 rounded-lg" />
                  <span className="flex items-center gap-1">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-1/3 rounded-lg" />
                  </span>
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ServiceCardSkelton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
