import ServiceCard from "@/components/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import ServiceCardSkelton from "@/pages/home/skelaton/ServiceCardSkelton";
import { useServicesQuery } from "@/store/api/serviceApi";
import type { IService } from "@/types/service";
import { Link, useParams } from "react-router";

export default function AvailableServices() {
  const { providerId } = useParams();
  const { data, isLoading, isError, error } = useServicesQuery({
    limit: 4,
    owner_id: providerId!,
  });

  if (isLoading) {
    return (
      <section className="mt-[70px]">
        <div className="container mx-auto max-2xl:px-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <ServiceCardSkelton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    throw new Error("Failed to load provider profile", { cause: error });
  }

  const services: IService[] = data?.data || [];

  return (
    <section className="mt-[70px]">
      <div className="container mx-auto max-2xl:px-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold sm:text-2xl md:text-[32px]">
            Available Services
          </h2>
          <Link
            to={`/all-services?categories=${providerId}`}
            className="text-lg hover:underline md:text-xl"
          >
            See all
          </Link>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
