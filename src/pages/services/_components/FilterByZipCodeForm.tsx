import { Button } from "@/components/animate-ui/components/buttons/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import useFilterByZipCode from "./use-filter-by-zip-code";

export default function SearchByZipCodeForm() {
  const { form, onSubmit } = useFilterByZipCode();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-3"
      >
        <FormField
          control={form.control}
          name="zip_code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="ZIP Code"
                  {...field}
                  className="bg-card rounded-xl border-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="size-10 rounded-full" size="icon">
          <Search className="size-4" />
        </Button>
      </form>
    </Form>
  );
}
