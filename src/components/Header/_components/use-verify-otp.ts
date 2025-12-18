import useModal from "@/components/Modal/useModal";
import { useVerifyOtpMutation } from "@/store/api/authApi";
import type { VerifyOtpRequest } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  otp: z
    .string()
    .min(4, {
      message: "OTP must be at least 4 characters.",
    })
    .max(4, {
      message: "OTP must be at most 4 characters.",
    }),
});

export default function useVerifyOtp() {
  const { close, getParams } = useModal();
  const action = getParams("action") as VerifyOtpRequest["action"];
  const email = atob(getParams("email") || "");
  const redirect = getParams("redirect");
  const navigate = useNavigate();

  const [verifyOtp] = useVerifyOtpMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!action || !email)
      return toast.error("Action or email type is missing.");

    const toastId = toast.loading("Logging in...");
    try {
      await verifyOtp({ otp: values.otp, action: action, email: email });
      // Handle successful login (e.g., redirect, show success message)
      toast.success("Logged in successfully!", { id: toastId });

      if (redirect) {
        navigate(redirect);
      }

      close(["modal", "tab", "redirect", "email", "action"]);
    } catch (error) {
      // Handle login error (e.g., show error message)
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.", {
        id: toastId,
      });
    } finally {
      form.reset();
      toast.dismiss(toastId);
    }
  }
  return { form, onSubmit };
}
