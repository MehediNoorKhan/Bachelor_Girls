import { Skeleton } from "@/components/ui/skeleton";

export default function AboutSkelton() {
  return (
    <section>
      <div className="text-foreground container mx-auto mt-6 space-y-4 text-justify text-sm leading-relaxed max-2xl:px-4">
        <div className="flex flex-col gap-5 md:flex-row">
          <Skeleton className="size-full rounded-2xl sm:h-60 sm:w-80" />

          <div className="w-full">
            <div className="flex w-full justify-between">
              <div>
                <Skeleton className="h-4 w-32 rounded-md md:h-12 md:w-64" />
                {/* <span className="text-base">
                  ⭐ {user.rating.toFixed(2)} (
                  {user.reviews.toString().padStart(2, "0")} Reviews)
                </span> */}
              </div>

              <div>
                <Skeleton className="size-10 rounded-full md:size-12" />
              </div>
            </div>

            <Skeleton className="mt-5 h-8 w-32 rounded-md md:mt-10 md:h-10 md:w-48" />
            <Skeleton className="mt-2 h-2 w-full rounded-md md:mt-4 md:h-6" />
            <Skeleton className="mt-2 h-2 w-2/3 rounded-md md:mt-4 md:h-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
