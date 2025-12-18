import useModal from "@/components/Modal/useModal";
import { useCancelBookingMutation } from "@/store/api/myBookingsApi";
import type { IError } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  reason: z
    .string()
    .min(5, "Reason must be at least 5 characters.")
    .max(150, "Reason must be at most 100 characters."),
});

export default function useCancelBooking() {
  const { getParams, close } = useModal();
  const bookingId = getParams("bookingId");

  const [cancelBooking] = useCancelBookingMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!bookingId) return;
    const toastId = toast.loading("Cancelling booking...");
    try {
      await cancelBooking({
        booking_id: Number(bookingId),
        reason: data.reason,
      }).unwrap();
      toast.success("Booking cancelled successfully");
      close(["modal", "bookingId"]);
      form.reset();
    } catch (error: unknown) {
      const err = error as IError;
      toast.error(err.data?.message || "Failed to cancel booking");
      console.error("Failed to cancel booking:", error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return { form, onSubmit };
}
