import { useServicesQuery } from "@/store/api/serviceApi";

import Empty from "@/components/errors/Empty";
import SectionErrors from "@/components/errors/SectionErrors";
import ServiceCard from "@/components/ServiceCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { IService } from "@/types";
import { useSearchParams } from "react-router";
import ServiceSection from "../skelton/ServiceSection";
import Filters from "./Filters";
import MobileFilters from "./MobileFilters";
import Sorting from "./Sorting";

export default function ExploreServices() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [searchParams] = useSearchParams();
  const categories = searchParams.get("categories")?.split(",") || [];
  const max_price = searchParams.get("max_price") || undefined;
  const min_price = searchParams.get("min_price") || undefined;
  const zip_code = searchParams.get("zip_code") || undefined;
  const type = searchParams.get("type") || undefined;

  const { data, isLoading, isError } = useServicesQuery({
    max_price: max_price,
    min_price: min_price,
    zip_code: zip_code,
    category_id: categories,
    type,
  });

  if (isLoading) return <ServiceSection />;
  if (isError) return <SectionErrors />;

  const services: IService[] = data?.data || [];

  return (
    <section>
      <div className="container mx-auto space-y-6 max-xl:px-2">
        <h1 className="text-lg font-bold md:text-2xl">Explore Services</h1>
        <div className="flex gap-6">
          {!isMobile && <Filters />}

          <div className="flex-1 space-y-6">
            <div>
              <div className="bg-muted col-span-full flex items-center justify-between rounded-xl p-4">
                <h1 className="text-base font-semibold md:text-[22px]">
                  All Service
                </h1>

                <div className="flex items-center gap-2">
                  <Sorting />

                  {isMobile && <MobileFilters />}
                </div>
              </div>
            </div>
            {services.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
