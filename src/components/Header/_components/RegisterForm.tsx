import { Checkbox } from "@/components/animate-ui/components/base/checkbox";
import { Button } from "@/components/animate-ui/primitives/buttons/button";
import useModal from "@/components/Modal/useModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import GoogleLogin from "./GoogleLogin";
import useRegister from "./use-register";

export default function RegisterForm() {
  const { open } = useModal();
  const { form, onSubmit } = useRegister();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Name"
                  className="bg-input h-11 rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  className="bg-input h-11 rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Phone number"
                  className="bg-input h-11 rounded-xl"
                  {...field}
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
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                    className="bg-input h-11 rounded-xl pr-10"
                  />
                  <Button
                    type="button"
                    className="text-muted-foreground !absolute top-1/2 right-3 -translate-y-1/2 transform"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...field}
                    className="bg-input h-11 rounded-xl pr-10"
                  />
                  <Button
                    type="button"
                    className="text-muted-foreground !absolute top-1/2 right-3 -translate-y-1/2 transform"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex cursor-pointer items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="size-4"
                />
              </FormControl>
              <FormLabel className="text-muted-foreground cursor-pointer text-sm font-normal">
                Terms & conditions
              </FormLabel>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-primary text-background h-11 w-full cursor-pointer rounded-xl text-xs font-medium disabled:opacity-50"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Sign Up
        </Button>

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-light">Sign Up With</p>
            <GoogleLogin />
          </div>

          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Button
              type="button"
              className="text-primary cursor-pointer"
              onClick={() => open([{ modalId: "tab", openId: "login" }])}
            >
              Log In
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
