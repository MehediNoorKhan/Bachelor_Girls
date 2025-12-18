import useMessage from "./use-message";

import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function MessageForm() {
  const { form, onSubmit } = useMessage();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Type a message"
                  {...field}
                  className="bg-input rounded-full border-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"link"}
          className="absolute top-1/2 right-0 -translate-y-1/2 transform cursor-pointer"
        >
          <Icon src="/icons/send.svg" />
        </Button>
      </form>
    </Form>
  );
}
