import useModal from "@/components/Modal/useModal";
import { useRequestFullPaymentMutation } from "@/store/api/dueListApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Amount must be at least 1 character.",
  }),
  note: z.string().min(1, {
    message: "Note must be at least 1 character.",
  }),
});

export default function useFullPaymentRequest() {
  const { close, getParams } = useModal();
  const id = getParams("id");
  const [requestFullPayment] = useRequestFullPaymentMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      note: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Submitting your request...");

    try {
      if (!id) {
        throw new Error("Invalid booking ID");
      }

      await requestFullPayment({
        requested_amount: Number(values.amount),
        booking_id: id,
        note: values.note,
      }).unwrap();

      toast.success("Request submitted successfully!", {
        id: toastId,
      });
      form.reset();
      close(["modal"]);
    } catch (error) {
      const err = error as Error;
      console.error("Error submitting custom request:", err);
      toast.error(
        err.message || "Failed to submit request. Please try again.",
        {
          id: toastId,
        },
      );
    } finally {
      toast.dismiss(toastId);
    }
  }

  return {
    form,
    onSubmit,
  };
}
