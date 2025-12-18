import useModal from "@/components/Modal/useModal";
import { useBookAppointmentMutation } from "@/store/api/bookAppoinmentApi";
import type { IService } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export default function useConfirmationBooking({
  service,
}: {
  service?: IService;
}) {
  const { close } = useModal();
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");

  const formSchema = z.object({
    advance: z.string().refine(
      (val) => {
        const numVal = parseFloat(val);
        if (isNaN(numVal)) return false;
        if (service && numVal > service.price) return false;
        if (service && numVal < service.minimum_deposite) return false;
        return true;
      },
      {
        message: service
          ? `Advance must be between $${service.minimum_deposite} and $${service.price}`
          : "Invalid advance amount",
      },
    ),
  });

  const [bookAppointment] = useBookAppointmentMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      advance: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!service) return;
    const toastId = toast.loading("Booking appointment...");
    try {
      const result = await bookAppointment({
        advance: parseFloat(values.advance),
        service_id: service.id,
        time_slot_id: selectedTime ? Number(selectedTime) : 0,
        date: selectedDate ? selectedDate : "",
        payment_method: "stripe",
      }).unwrap();

      toast.success("Appointment booked successfully!", { id: toastId });
      close(["modal", "time"]);
      // Redirect to the checkout URL
      if (result.data.checkout_url) {
        window.open(result.data.checkout_url, "_blank");
      }
    } catch (error) {
      console.error("🚀 ~ onSubmit ~ error:", error);
      toast.error("Failed to book appointment. Please try again.", {
        id: toastId,
      });
    } finally {
      toast.dismiss(toastId);
    }
  }

  // 3. Return the form and the submit handler.
  return { form, onSubmit };
}
