import useModal from "@/components/Modal/useModal";
import { useRescheduleBookingMutation } from "@/store/api/myBookingsApi";
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

export default function useRescheduleBooking() {
  const { getParams, close } = useModal();
  const bookingId = getParams("bookingId");
  console.log("🚀 ~ useRescheduleBooking ~ bookingId:", bookingId);
  const timeSlotId = getParams("time");
  const date = getParams("date");

  const [rescheduleBooking] = useRescheduleBookingMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!bookingId || !timeSlotId || !date) return;
    const toastId = toast.loading("Rescheduling booking...");
    try {
      await rescheduleBooking({
        booking_id: Number(bookingId),
        time_slot_id: Number(timeSlotId),
        date: date,
        reason: data.reason,
      }).unwrap();
      toast.success("Booking rescheduled successfully");
      close(["modal", "bookingId"]);
      form.reset();
    } catch (error: unknown) {
      const err = error as IError;
      toast.error(err?.data?.message || "Failed to reschedule booking");
      console.error("Failed to reschedule booking:", error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return { form, onSubmit };
}
