import { useProfileQuery } from "@/store/api/authApi";
import { useUpdateProfileMutation } from "@/store/api/myProfileApi";
import type { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  avatar: z
    .union([
      z.string().url("Profile picture must be a valid URL."),
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= 5 * 1024 * 1024, // 5MB limit
          "File size must be less than 5MB.",
        )
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
              file.type,
            ),
          "Only JPEG, PNG, JPG, and WebP files are allowed.",
        ),
    ])
    .optional(),
  name: z.string().min(2, "First name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number must be at most 15 digits."),
  about_me: z
    .string()
    .min(10, "Bio must be at least 10 characters.")
    .max(500, "Bio must be at most 500 characters.")
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .optional(),
});

export default function useProfile() {
  const { data } = useProfileQuery();
  const user = data?.data || ({} as IUser);

  const [updateProfile] = useUpdateProfileMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: user.avatar || "",
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      about_me: user.about_me || "",
      description: user.description || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Updating profile...");
    try {
      const formData = new FormData();
      for (const key in values) {
        const value = values[key as keyof typeof values];
        if (value !== undefined && value !== null && value !== "") {
          // If avatar is a File, append as file, else as string
          if (key === "avatar" && value instanceof File) {
            formData.append(key, value);
          } else if (value) {
            formData.append(key, value as string);
          }
        }
      }

      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      toast.dismiss(toastId);
    }
  }

  return { form, onSubmit };
}
