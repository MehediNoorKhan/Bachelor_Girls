import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkelton() {
  return (
    <section className="relative h-[198px] border-b-3 border-[#E7E7E7] bg-cover bg-center bg-no-repeat">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 from-[7%] to-black/0 to-[50%]">
        {/* Content */}
        <div className="container mx-auto">
          <Skeleton className="mt-[18px] h-14 w-60 rounded" />
        </div>
      </div>
    </section>
  );
}
