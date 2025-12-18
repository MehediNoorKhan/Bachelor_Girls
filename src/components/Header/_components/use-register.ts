import useModal from "@/components/Modal/useModal";
import { useRegisterMutation } from "@/store/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
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

export default function useRegister() {
  const { close, getParams, open } = useModal();
  const redirect = getParams("redirect");

  const [register] = useRegisterMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Registering...");

    try {
      await register({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        password_confirmation: values.confirmPassword,
      });

      toast.success("Registration successful!", {
        id: toastId,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.", {
        id: toastId,
      });
    } finally {
      toast.dismiss(toastId);
    }

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

    form.reset();
  }
  return { form, onSubmit };
}
