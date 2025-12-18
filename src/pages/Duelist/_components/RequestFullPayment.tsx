import { Button } from "@/components/animate-ui/components/buttons/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFullPaymentRequest from "./use-full-payment-request";

export default function RequestFullPayment() {
  const { form, onSubmit } = useFullPaymentRequest();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card space-y-4 rounded-[30px] p-5"
      >
        <h3 className="text-center text-xl font-bold">Request Payment</h3>

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter your amount..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input placeholder="Write note here..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size={"lg"}
          type="submit"
          className="w-full cursor-pointer rounded-[10px] text-base font-semibold"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Confirm
        </Button>
      </form>
    </Form>
  );
}
