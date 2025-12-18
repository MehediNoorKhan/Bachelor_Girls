import useModal from "@/components/Modal/useModal";
import { useRequestCustomDuePaymentMutation } from "@/store/api/dueListApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Amount must be at least 1 characters.",
  }),
  note: z.string().min(1, {
    message: "Note must be at least 1 characters.",
  }),
});

export default function useCustomRequest() {
  const { close, getParams } = useModal();
  const id = getParams("id");
  const [requestCustomDuePayment] = useRequestCustomDuePaymentMutation();

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

      await requestCustomDuePayment({
        booking_id: id,
        amount: Number(values.amount),
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
