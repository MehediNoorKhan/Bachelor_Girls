import Icon from "@/components/Icon";
import RatingStar from "@/components/RatingStar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between gap-3 p-4">
        <Icon src="/icons/quote.svg" className="h-4.5 w-[25px]" />
        <RatingStar rating={review.rating} />
      </div>
      <p className="mt-3 border-b border-gray-200 pb-2.5 text-[12px] font-normal">
        {review.comment}
      </p>

      <div className="mt-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-10">
            <AvatarImage src={review.user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-semibold">{review.user.name}</p>
            <span className="text-muted-foreground text-[10px] font-normal">
              Posted on: N/A
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4.5">
          <Icon src="/icons/thumbs-up.svg" />
          <Icon src="/icons/thumbs-down.svg" />
        </div>
      </div>
    </div>
  );
}
