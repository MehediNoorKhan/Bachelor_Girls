import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useRescheduleBooking from "./use-reschedule-booking";

export default function RescheduleBookingForm() {
  const { form, onSubmit } = useRescheduleBooking();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-background space-y-8 rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold">Reschedule Booking</h2>

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input placeholder="Enter reason here" {...field} />
              </FormControl>
              <FormDescription>
                Please provide a brief reason for rescheduling.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"destructive"}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
