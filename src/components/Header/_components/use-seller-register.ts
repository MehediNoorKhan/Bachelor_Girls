import useModal from "@/components/Modal/useModal";
import { useOwnerRegisterMutation } from "@/store/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
  });

export default function useSellerRegister() {
  const { close, getParams, open } = useModal();
  const redirect = getParams("redirect");

  const [register] = useOwnerRegisterMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Registering seller...");

    try {
      await register({
        ...values,
        password_confirmation: values.confirmPassword,
      });

      toast.success("Seller registered successfully!", { id: toastId });

      close(["tab"]);

      if (redirect) {
        open([
          { modalId: "modal", openId: "verify-otp" },
          { modalId: "redirect", openId: redirect },
        ]);
      } else {
        open([
          { modalId: "modal", openId: "verify-otp" },
          { modalId: "email", openId: btoa(values.email) },
          { modalId: "action", openId: "email_verification" },
        ]);
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Registration failed:", error);
      toast.error(err.message || "Registration failed. Please try again.", {
        id: toastId,
      });
    } finally {
      toast.dismiss(toastId);
    }
  }
  return { form, onSubmit };
}
