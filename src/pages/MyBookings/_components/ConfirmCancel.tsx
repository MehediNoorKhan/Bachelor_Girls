import { Button } from "@/components/animate-ui/components/buttons/button";
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
import useCancelBooking from "./use-cancel-booking";

export default function ConfirmCancel() {
  const { form, onSubmit } = useCancelBooking();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-background space-y-8 rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold">Confirm Cancellation</h2>
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
                Please provide a brief reason for cancellation.
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
