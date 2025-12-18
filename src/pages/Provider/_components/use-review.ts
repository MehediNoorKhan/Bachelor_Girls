import { usePostReviewMutation } from "@/store/api/providerProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment must be at least 2 characters.",
  }),
  rating: z.number().min(1).max(5),
});

export default function useReview() {
  const { providerId } = useParams();

  const [postReview] = usePostReviewMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!providerId) return;

    const toastId = toast.loading("Submitting your review...");
    try {
      await postReview({
        reviewable_type: "businessOwner",
        reviewable_id: Number(providerId),
        rating: values.rating,
        comment: values.comment,
      });
      toast.success("Review submitted successfully!", { id: toastId });
      form.reset();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("There was an error submitting your review.", {
        id: toastId,
      });
    } finally {
      toast.dismiss(toastId);
    }
  }

  return {
    form,
    onSubmit,
  };
}
