import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useVerifyOtp from "./use-verify-otp";

export default function OtpVerificationForm() {
  const { form, onSubmit } = useVerifyOtp();

  return (
    <div className="relative sm:w-[45dvw]">
      <div className="absolute inset-0 -z-1 size-full rotate-4 rounded-2xl bg-[#DD9778]" />
      <div className="absolute bottom-10 left-16 space-y-1 rounded-tl-2xl rounded-br-2xl bg-white/10 px-12 py-3 backdrop-blur-sm max-2xl:hidden">
        <p className="text-center text-xs text-white">Welcome to the Nest</p>
        <p className="text-center text-xs text-white">
          For Seamless Scheduling
        </p>
        <span className="mt-4 flex items-center justify-center gap-1">
          <span className="block size-1.5 rounded-full bg-white" />
          <span className="block size-2 rounded-full bg-white" />
          <span className="grid size-3 place-content-center rounded-full bg-white">
            <span className="block size-1.5 rounded-full border border-black/50 bg-white" />
          </span>
          <span className="block size-2 rounded-full bg-white" />
          <span className="block size-1.5 rounded-full bg-white" />
        </span>
      </div>

      <div className="flex size-full w-full justify-end rounded-2xl bg-[url('/images/authPageBg.jpg')] bg-cover bg-fixed bg-position-[center_right_11dvw] bg-no-repeat">
        <div className="bg-background grid h-[500px] w-full max-w-[500px] place-items-center rounded-2xl p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <h1 className="py-4 text-2xl font-semibold">Verify OTP</h1>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup className="space-x-4">
                          <InputOTPSlot
                            index={0}
                            className="bg-input h-11 w-11 rounded-xl text-2xl font-medium"
                          />
                          <InputOTPSlot
                            index={1}
                            className="bg-input h-11 w-11 rounded-xl text-2xl font-medium"
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="space-x-4">
                          <InputOTPSlot
                            index={2}
                            className="bg-input h-11 w-11 rounded-xl text-2xl font-medium"
                          />
                          <InputOTPSlot
                            index={3}
                            className="bg-input h-11 w-11 rounded-xl text-2xl font-medium"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Enter the 4-digit code sent to your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-primary text-background h-11 w-full cursor-pointer rounded-xl text-xs font-medium disabled:opacity-50"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                Verify OTP
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
