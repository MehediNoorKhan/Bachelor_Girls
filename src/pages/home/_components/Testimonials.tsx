import SectionErrors from "@/components/errors/SectionErrors";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestimonialSection from "@/pages/home/skelaton/TestimonialSection";
import { useTopRatedProvidersQuery } from "@/store/api/homeApi";
import { ArrowLeft, Star } from "lucide-react";

export default function Testimonials() {
  const { data, isLoading, isError } = useTopRatedProvidersQuery();
  const providers = data?.data || [];

  if (isLoading) return <TestimonialSection />;
  if (isError) return <SectionErrors />;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`size-6 ${
          index < rating ? "fill-primary text-primary" : "text-muted-foreground"
        }`}
      />
    ));
  };

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
          {providers.map((provider, idx) => (
            <CarouselItem
              key={idx}
              className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
            >
              <Card className="h-full border-0 shadow-[0_4px_20.5px_0_rgba(0,0,0,0.07)] transition-shadow duration-200 hover:shadow-md">
                <CardContent className="flex h-full flex-col p-6">
                  {/* Avatar */}
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={provider.avatar} alt={provider.name} />
                      <AvatarFallback className="">
                        {provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    {/* Rating and Service Type */}
                    <div className="mb-3 flex flex-col items-end justify-center">
                      <div className="mr-2 flex items-center gap-1">
                        {renderStars(provider.avg_rating)}
                      </div>
                      <span className="text-muted-foreground space-x-2">
                        <span className="text-primary text-sm lg:text-lg">
                          Service Type:
                        </span>
                        <span className="text-sm font-medium lg:text-lg">
                          {provider.category}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 line-clamp-4 flex-grow text-lg leading-relaxed">
                    {provider.about}
                  </p>

                  {/* Provider Info */}
                  <div className="text-muted-foreground">
                    <h3 className="mb-1 text-xl font-semibold">
                      {provider.name}
                    </h3>
                    <p className="text-lg">{provider.email}</p>
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
