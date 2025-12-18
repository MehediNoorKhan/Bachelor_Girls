import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import StarRatings from "react-star-ratings";
import useReview from "./use-review";

export default function ReviewForm() {
  const { form, onSubmit } = useReview();
  return (
    <section>
      <div className="container mx-auto mt-[70px] max-2xl:px-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between md:flex-row md:items-center">
                  <FormLabel className="text-2xl font-bold md:text-[32px]">
                    Leave a Review :
                  </FormLabel>
                  <FormControl>
                    <StarRatings
                      svgIconViewBox="0 0 37 36"
                      svgIconPath="M18.5008,28.0216L28.6976,34.5L25.9917,22.29L35.0006,14.0747L23.1372,13.0153L18.5008,1.5L13.8643,13.0153L2.00098,14.0747L11.0099,22.29L8.3039,34.5L18.5008,28.0216Z"
                      rating={field.value}
                      starEmptyColor="#B8B8B8"
                      starHoverColor="#FF7F22"
                      starRatedColor="#FF7F22"
                      starDimension="33px"
                      starSpacing="3px"
                      changeRating={field.onChange}
                      numberOfStars={5}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="bg-muted h-[360px] resize-none rounded-2xl border-none p-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-[52px] w-full rounded-full text-lg font-medium md:w-[225px]"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
