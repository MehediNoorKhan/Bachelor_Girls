import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { Skeleton } from "../../../components/ui/skeleton";

export default function TestimonialSection() {
  return (
    <section className="container mx-auto my-12 px-4">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Top Rated Providers
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="relative mx-auto w-full max-w-7xl"
      >
        <CarouselContent className="-ml-2 p-3 select-none md:-ml-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <CarouselItem
              key={idx}
              className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
            >
              <Card className="h-full border-0 shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-shadow duration-200 hover:shadow-md dark:shadow-[0_0px_10px_0_var(--primary)]/50">
                <CardContent className="flex h-full flex-col p-6">
                  {/* Avatar */}
                  <div className="mb-4 flex items-start justify-between">
                    <Skeleton className="h-16 w-16 rounded-full" />

                    {/* Rating and Service Type */}
                    <div className="mb-3 flex flex-col items-end justify-center">
                      <div className="mr-2 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Skeleton className="size-6" key={index} />
                        ))}
                      </div>
                      <span className="text-muted-foreground mt-3 flex items-center gap-1 text-lg">
                        <span className="text-primary text-lg">
                          <Skeleton className="h-4 w-16" />
                        </span>
                        <span className="text-lg font-medium">
                          <Skeleton className="h-4 w-24" />
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 line-clamp-4 flex-grow text-lg leading-relaxed">
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="mb-2 h-4 w-1/2" />
                  </p>

                  {/* Provider Info */}
                  <div className="text-muted-foreground">
                    <h3 className="mb-1 text-xl font-semibold">
                      <Skeleton className="h-6 w-24" />
                    </h3>
                    <p className="text-lg">
                      <Skeleton className="h-4 w-40" />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="!absolute left-0 md:-left-12">
          <ArrowLeft className="size-8" />
        </CarouselPrevious>
        <CarouselNext className="!absolute right-0 md:-right-12">
          <ArrowLeft className="size-8 rotate-180" />
        </CarouselNext>
      </Carousel>
    </section>
  );
}
