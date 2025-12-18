import { Button } from "@/components/animate-ui/components/buttons/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useSearch from "./use-search";

export default function SearchForm() {
  const { form, onSubmit } = useSearch();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex w-full items-center md:w-[54%]"
      >
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Search for any services"
                  className="w-full !bg-white p-5 pr-12 text-base text-black placeholder:text-gray-500 md:p-6 md:pr-14 md:!text-lg"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          size={"icon"}
          className="bg-primary !absolute right-1 size-9 md:right-1 md:size-11"
        >
          <Search className="size-5 md:size-6" />
        </Button>
      </form>
    </Form>
  );
}
