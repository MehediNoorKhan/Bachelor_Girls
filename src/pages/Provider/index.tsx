import About from "@/components/About";
import Hero from "@/components/Hero";
import AvailableServices from "./_components/AvailableServices";
import ReviewForm from "./_components/ReviewForm";
import Reviews from "./_components/Reviews";

export default function ProviderProfile() {
  return (
    <main>
      <Hero title="Provider Profile" />
      <About />
      <AvailableServices />
      <Reviews />
      <ReviewForm />
    </main>
  );
}
