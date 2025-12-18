import SectionErrors from "@/components/errors/SectionErrors";
import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useOwnerReviewsQuery } from "@/store/api/providerProfile";
import { useParams } from "react-router";
import ReviewSkeleton from "../skelton/ReviewSkeleton";

export default function Reviews() {
  const { providerId } = useParams();

  const { data, isLoading, isError } = useOwnerReviewsQuery({
    owner_id: providerId!,
  });

  if (isLoading) return <ReviewSkeleton />;
  if (isError) return <SectionErrors />;

  const reviews = data?.data?.reviews || [];
  const totalReviews = data?.data?.total_review || 0;

  return (
    <section className="mt-[70px]">
      <div className="container mx-auto max-2xl:px-2">
        <h2 className="text-2xl font-bold md:text-[32px]">
          Reviews ({totalReviews.toString().padStart(2, "0")})
        </h2>

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
                <Avatar className="size-10">
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="w-32 md:w-64">
                  <h2 className="font-semibold">{review.user.name}</h2>
                  <p className="text-muted-foreground text-[10px]">
                    Posted on :{" "}
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
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
    </section>
  );
}

// const reviews = Array.from({ length: 9 }).map(() => ({
//   id: faker.string.uuid(),
//   rating: faker.number.int({ min: 1, max: 5 }),
//   comment: faker.lorem.sentences(3),
//   name: faker.person.firstName(),
//   avatarUrl: faker.image.avatar(),
//   createdAt: faker.date.past().toISOString(),
// }));
