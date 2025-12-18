import ServiceCardSkelton from "./ServiceCardSkelton";

export default function ServiceSectionSkelton() {
  return (
    <section id="services">
      <div className="container mx-auto max-xl:px-2">
        <h1 className="my-10 text-center text-4xl">Browse Services</h1>
        <div className="grid grid-cols-1 gap-4 min-[1023]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ServiceCardSkelton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
