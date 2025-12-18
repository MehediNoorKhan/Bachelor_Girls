import { Skeleton } from "../../../components/ui/skeleton";

export default function CategoriesSectionSkelton() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl px-4 py-4 shadow-[0_1px_10px_0_rgba(0,0,0,0.2)] dark:shadow-[0_1px_10px_0_var(--primary)]/50"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="size-10 rounded-full" />
                <div>
                  <Skeleton className="h-6 w-32 rounded" />
                  <Skeleton className="mt-2 h-4 w-24 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
