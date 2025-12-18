import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProfileQuery } from "@/store/api/authApi";
import type { IService } from "@/types/service";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router";
import Favorite from "./Favorite";
import Icon from "./Icon";
import useModal from "./Modal/useModal";
import { Skeleton } from "./ui/skeleton";

interface ServiceCardProps {
  service: IService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { open } = useModal();
  const { data, isLoading } = useProfileQuery();
  const isAuthenticated = !!data?.data;

  return (
    <div className="rounded-2xl p-5 shadow-[0_4px_20.5px_0_rgba(0,0,0,0.07)] hover:shadow-[0_4px_20.5px_0_rgba(0,0,0,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <Avatar className="size-[80px] md:size-[92px] xl:size-32">
          <AvatarImage src={service.image as string} alt={service.title} />
          <AvatarFallback>
            <Skeleton className="h-full w-full" />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-5">
          <Badge
            variant="outline"
            className="text-primary border-primary line-clamp-1 max-w-[100px] truncate rounded-2xl border px-3 py-1.5"
          >
            {service.category_name}
          </Badge>

          {isAuthenticated ? (
            <Favorite serviceId={service.id} />
          ) : (
            <Button
              variant={"secondary"}
              size={"icon"}
              className={cn("cursor-pointer rounded-full")}
              onClick={() =>
                open([
                  { modalId: "modal", openId: "authentication" },
                  { modalId: "tab", openId: "login" },
                ])
              }
              disabled={isLoading}
            >
              <Heart size={34} />
            </Button>
          )}
        </div>
      </div>

      <h1 className="mt-5 line-clamp-1 text-xl font-semibold">
        {service.title}
      </h1>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        {isAuthenticated ? (
          <Link
            to={`/provider-profile/${service.owner.id}`}
            className="hover:underline"
          >
            <div className="flex items-center gap-[3px]">
              <Avatar className="size-5">
                <AvatarImage
                  src={service.owner.avatar}
                  alt={service.owner.name}
                />
                <AvatarFallback>{service.owner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-medium">{service.owner.name}</h3>
            </div>
          </Link>
        ) : (
          <Button
            variant={"link"}
            className="cursor-pointer p-0 hover:underline"
            onClick={() =>
              open([
                { modalId: "modal", openId: "authentication" },
                { modalId: "tab", openId: "login" },
              ])
            }
            disabled={isLoading}
          >
            <div className="flex items-center gap-[3px]">
              <Avatar className="size-5">
                <AvatarImage
                  src={service.owner.avatar}
                  alt={service.owner.name}
                />
                <AvatarFallback>{service.owner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-medium">{service.owner.name}</h3>
            </div>
          </Button>
        )}

        <span className="text-muted-foreground flex items-center gap-1 text-sm">
          <Star className="size-4 text-yellow-500" />
          {service.ratings.toFixed(1)} (
          {service?.total_reviews.toString().padStart(2, "0")})
        </span>
      </div>
      <p className="mt-1 text-[10px] font-normal text-[#54BE17]">
        Instant Booking Available
      </p>

      {/* <span className="text-success text-sm">Instant Booking available</span> */}
      <hr className="border-muted mt-4 mb-2 border-1" />
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-end gap-[5px]">
            <p className="text-primary text-lg font-bold">
              ${service.price.toFixed(2)}
            </p>

            {service.discount && (
              <span className="text-[10px] font-light">
                ({service.discount.toFixed(0)}% Off)
              </span>
            )}
          </div>
          <span className="mt-1 text-xs font-medium">Per session</span>
        </div>

        {isAuthenticated ? (
          <Link
            to={
              !isLoading
                ? `/book-appointment/${service.id}/${service.owner.id}`
                : "#"
            }
          >
            <Button
              className="cursor-pointer rounded-full text-xs font-medium"
              disabled={isLoading}
            >
              <span>Book Now</span>
              <Icon
                src="/icons/keyboard_arrow.svg"
                className="size-[18px] rotate-270"
              />
            </Button>
          </Link>
        ) : (
          <Button
            className="cursor-pointer rounded-full text-xs font-medium"
            onClick={() =>
              open([
                { modalId: "modal", openId: "authentication" },
                { modalId: "tab", openId: "login" },
                {
                  modalId: "redirect",
                  openId: `/book-appointment/${service.id}/${service.owner.id}`,
                },
              ])
            }
            disabled={isLoading}
          >
            <span>Book Now</span>
            <Icon
              src="/icons/keyboard_arrow.svg"
              className="size-[18px] rotate-270"
            />
          </Button>
        )}
      </div>
    </div>
  );
}
