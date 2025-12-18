import useModal from "@/components/Modal/useModal";
import { useLoginMutation } from "@/store/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean(),
});

export default function useLogin() {
  const { close, getParams } = useModal();
  const [login] = useLoginMutation();

  const redirect = getParams("redirect");
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Logging in...");
    try {
      await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      // Handle successful login (e.g., redirect, show success message)
      toast.success("Logged in successfully!", { id: toastId });

      if (redirect) {
        navigate(redirect);
      }

      close(["modal", "tab", "redirect"]);
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
