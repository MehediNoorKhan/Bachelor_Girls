import SectionErrors from "@/components/errors/SectionErrors";
import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetReviewsQuery } from "@/store/api/dashboard.api";
import ReviewSkelton from "./skelton/ReviewSkelton";

export default function AllReview() {
  const { data, isLoading, isError } = useGetReviewsQuery();

  if (isLoading) {
    return <ReviewSkelton />;
  }

  if (isError) {
    return <SectionErrors />;
  }

  const reviews = [
    ...(data?.data?.owner_reviews ?? []),
    ...(data?.data?.service_reviews ?? []),
  ];

  return (
    <div>
      <div className="mt-[47px] flex w-full items-center justify-between">
        <h3 className="text-[22px] font-bold sm:text-[26px]">
          Reviews({reviews.length})
        </h3>

        <div className="flex items-center gap-4">
          <p className="text-muted-foreground text-sm leading-[120%] font-normal">
            5 Selected
          </p>

          <Button
            variant={"link"}
            className="text-muted-foreground cursor-pointer text-sm leading-[120%] font-normal hover:no-underline"
          >
            Select All
          </Button>

          <Button className="flex cursor-pointer items-center text-sm font-normal hover:no-underline">
            <Icon src="/icons/delete.svg" className="size-[15px]" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border px-2.5 py-5 shadow-[0_7px_9.3px_0_rgba(234,236,242,0.28)]"
          >
            <div className="mb-3 flex justify-between">
              <Icon src="/icons/quote.svg" />

              <span className="flex">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Icon
                    key={index}
                    src="/icons/star.svg"
                    className="inline-block h-4 w-4"
                  />
                ))}
              </span>
            </div>
            <p className="line-clamp-3 text-xs">{review.comment}</p>
            <hr className="my-2.5" />

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                <Avatar className="size-10">
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="w-32 md:w-64">
                  <h2 className="font-semibold">{review.user.name}</h2>
                  <p className="text-muted-foreground text-[10px]">
                    Posted on : N/A
                  </p>
                </div>
              </div>

              <div className="gap flex items-center">
                <Button
                  variant="link"
                  size={"icon"}
                  className="text-foreground"
                >
                  <Icon src="/icons/thumbs-up.svg" className="size-5" />
                </Button>
                <Button
                  variant="link"
                  size={"icon"}
                  className="text-foreground"
                >
                  <Icon src="/icons/thumbs-down.svg" className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
