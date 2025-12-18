import Categories from "./_components/Categories";
import Hero from "./_components/Hero";
import ServiceSection from "./_components/ServiceSection";
import Testimonials from "./_components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <ServiceSection />
      <Testimonials />
    </main>
  );
}
