import { Button } from "@/components/animate-ui/components/buttons/button";
import SectionErrors from "@/components/errors/SectionErrors";
import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProviderProfileQuery } from "@/store/api/providerProfile";
import type { IProviderProfile } from "@/types";
import { useParams } from "react-router";
import AboutSkelton from "../pages/Provider/skelton/AboutSkelton";

export default function About() {
  const { providerId } = useParams();
  const { data, isLoading, isError } = useProviderProfileQuery(providerId!);

  if (isLoading) return <AboutSkelton />;

  if (isError) return <SectionErrors />;

  const user = data?.data || ({} as IProviderProfile);

  return (
    <section>
      <div className="text-foreground container mx-auto mt-6 space-y-4 text-justify text-sm leading-relaxed max-2xl:px-4">
        <div className="flex flex-col gap-5 md:flex-row">
          <Avatar className="size-full rounded-2xl bg-amber-400 sm:size-60 md:size-72">
            <AvatarImage
              src={user.avatar}
              alt={user.name}
              className="object-cover"
            />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="w-full">
            <div className="flex w-full justify-between">
              <div>
                <h2 className="text-2xl font-bold md:text-[32px]">
                  {user.name}
                </h2>
                {/* <span className="text-base">
                  ⭐ {user.rating.toFixed(2)} (
                  {user.reviews.toString().padStart(2, "0")} Reviews)
                </span> */}
              </div>

              <div>
                <Button size="icon" variant="link" className="cursor-pointer">
                  <Icon
                    src="/icons/message.svg"
                    className="size-8 md:size-10"
                  />
                </Button>
              </div>
            </div>

            <h1 className="mt-5 text-2xl font-bold md:mt-10 md:text-[28px]">
              About
            </h1>
            <p className="text-muted-foreground mt-2 md:mt-4">
              {user.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
