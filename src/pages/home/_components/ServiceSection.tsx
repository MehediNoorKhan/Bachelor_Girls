import Empty from "@/components/errors/Empty";
import SectionErrors from "@/components/errors/SectionErrors";
import ServiceCard from "@/components/ServiceCard";
import ServiceSectionSkelton from "@/pages/home/skelaton/ServiceSectionSkelton";
import { useServicesQuery } from "@/store/api/serviceApi";

export default function ServiceSection() {
  const { data, isLoading, isError } = useServicesQuery({
    limit: 6,
  });

  const services = data?.data || [];

  if (isLoading) {
    return <ServiceSectionSkelton />;
  }

  if (isError) {
    return <SectionErrors />;
  }

  if (services.length === 0) {
    return <Empty />;
  }

  return (
    <section id="services">
      <div className="container mx-auto max-xl:px-2">
        <h1 className="my-10 text-center text-4xl">Browse Services</h1>
        <div className="grid grid-cols-1 gap-5 min-[1023]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
