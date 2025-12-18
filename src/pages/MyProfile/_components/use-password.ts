import { useUpdatePasswordMutation } from "@/store/api/myProfileApi";
import type { IError } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    old_password: z
      .string()
      .min(6, "Old password must be at least 6 characters."),
    password: z.string().min(6, "New password must be at least 6 characters."),
    password_confirmation: z
      .string()
      .min(6, "Please confirm your new password."),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "New passwords do not match.",
  });

export default function usePassword() {
  const [updatePassword] = useUpdatePasswordMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Updating password...");
    try {
      const result = await updatePassword(values);

      if (result.error) {
        const err = result.error as IError;
        return toast.error(err?.data?.message || "Failed to update password.");
      }

      toast.success("Password updated successfully!");
      form.reset();
    } catch (error: unknown) {
      const err = error as IError;
      console.error(err?.data?.message || "Failed to update password:", error);
      toast.error("Failed to update password.");
    } finally {
      toast.dismiss(toastId);
    }
  }

  return { form, onSubmit };
}
