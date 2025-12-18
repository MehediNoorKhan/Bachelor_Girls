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
import usePassword from "./use-password";

export default function PasswordForm() {
  const { form, onSubmit } = usePassword();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-10">
        <div className="flex flex-col items-center gap-[43px] lg:flex-row">
          <FormField
            control={form.control}
            name="old_password"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel className="mb-[17px] font-bold text-[#384D6C]">
                  Old Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="************"
                    {...field}
                    className="h-12 rounded-[8px] border-2 px-5 py-4 shadow-none placeholder:font-light placeholder:italic"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel className="mb-[17px] font-bold text-[#384D6C]">
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="************"
                    {...field}
                    className="h-12 rounded-[8px] border-2 px-5 py-4 shadow-none placeholder:font-light placeholder:italic"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="mb-[17px] font-bold text-[#384D6C]">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="************"
                  {...field}
                  className="placeholder:text-muted-foreground h-12 rounded-[8px] border-2 px-5 py-4 shadow-none placeholder:font-light placeholder:italic"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col items-center gap-5 lg:flex-row xl:max-w-1/2">
          <Button
            variant="outline"
            type="button"
            className="h-12 w-full flex-1 cursor-pointer rounded-full"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-12 w-full flex-1 cursor-pointer rounded-full"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
