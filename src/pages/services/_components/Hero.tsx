import SectionErrors from "@/components/errors/SectionErrors";
import { useProfileQuery } from "@/store/api/authApi";
import type { IUser } from "@/types";
import HeroSkelton from "../skelton/HeroSkelton";

export default function Hero() {
  const { data, isLoading, isError } = useProfileQuery();

  if (isLoading) return <HeroSkelton />;
  if (isError) return <SectionErrors />;

  const user = data?.data || ({} as IUser);

  return (
    <section className="relative h-[120px] border-b-3 border-[#E7E7E7] bg-[url('/images/ToPanelBg.svg')] bg-cover bg-center bg-no-repeat md:h-[198px]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 from-[7%] to-black/0 to-[50%]">
        {/* Content */}
        <div className="container mx-auto max-md:px-2">
          <h1 className="mt-[18px] text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Welcome Back, {user.name}!
          </h1>
        </div>
      </div>
    </section>
  );
}
