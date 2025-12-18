import { Button } from "@/components/animate-ui/components/buttons/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetReviewsQuery } from "@/store/api/dashboard.api";
import { Shrink } from "lucide-react";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  const { data } = useGetReviewsQuery();
  const reviews = data?.data?.owner_reviews || [];

  console.log("🚀 ~ Reviews.tsx:12 ~ Reviews ~ reviews:", reviews);

  return (
    <div className="rounded-[30px] border-2 py-5 shadow-[0_7px_9.3px_0_rgba(234,236,242,0.28)]">
      <div className="flex items-center justify-between px-5">
        <h4 className="bg-primary/20 text-primary rounded-[10px] border-2 p-2.5 text-sm font-bold">
          Reviews
        </h4>
        <Button
          variant={"link"}
          size={"icon"}
          className="size-6 cursor-pointer p-0 text-2xl font-bold"
        >
          <Shrink size={24} strokeWidth={3} />
        </Button>
      </div>

      <div className="mt-[14px] flex items-center justify-between px-5">
        <h3 className="text-lg font-bold">Reviews(220)</h3>
        <Badge
          className="text-foreground h-6 w-20 rounded-full text-[10px] font-normal"
          variant={"secondary"}
        >
          4.3 Ratings
        </Badge>
      </div>
      <ScrollArea className="mt-5 h-[300px] p-5">
        {reviews.length === 0 && <p>No reviews available</p>}
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ScrollArea>
    </div>
  );
}
