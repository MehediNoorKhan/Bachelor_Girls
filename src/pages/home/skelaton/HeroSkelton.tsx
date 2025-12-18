import { cn } from "@/lib/utils";
import { Skeleton } from "../../../components/ui/skeleton";

export default function HeroSkelton() {
  return (
    <section
      className={cn(
        "relative flex h-[80vh] flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 sm:px-6 md:h-[80vh]",
      )}
    >
      <div className="absolute top-0 left-0 z-0 h-full w-full bg-black opacity-50" />
      <div className="z-10 container mx-auto flex flex-col gap-6 px-0 md:gap-10">
        <h1 className="max-w-3xl text-center text-3xl font-bold text-white sm:text-4xl md:text-left md:text-5xl lg:text-6xl">
          {/* Book top-rated services <br className="hidden sm:block" /> or start
          selling your own. */}
          <Skeleton className="h-7 w-full max-w-sm md:h-12 lg:h-14" />
        </h1>
        <Skeleton className="h-6 w-full max-w-2xl md:h-10 lg:h-12" />
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start md:gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-8 w-32 md:h-10 md:w-40 lg:h-12 lg:w-48"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
