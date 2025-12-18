import { objectToFormData } from "@/lib/utils";
import { useAddServiceMutation } from "@/store/api/serviceApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, "Service title must be at least 2 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  duration: z.string().min(1, "Duration must be at least 1 minute").optional(),
  price: z.string().min(1, "Price must be at least 1"),
  image: z.union([
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
  ]),
  tax: z.string().min(0, "Tax must be at least 0").optional(),
  service_at: z.enum(["virtual", "in-person"] as const, {
    error: "Please select a location type",
  }),
  location: z
    .string()
    .min(2, "Service location must be at least 2 characters")
    .optional(),
  is_deposite: z.enum(["yes", "no"] as const, {
    error: "Please select an option for deposit",
  }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export default function useAddService() {
  const navigate = useNavigate();

  const [addService] = useAddServiceMutation();

  // 1. Define your form.
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "40",
      price: "",
      image: "",
      tax: "",
      service_at: "virtual",
      location: "virtual",
      is_deposite: "no",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Adding your service...");
    try {
      const body = objectToFormData(values);
      await addService(body).unwrap();
      toast.success("Service added successfully!", { id: toastId });
      form.reset();
      navigate("/dashboard/release-service");
    } catch (error) {
      const err = error as Error;
      console.error("Error adding service:", err.message);
      toast.error(err.message || "Failed to add service.", { id: toastId });
    }
  }

  return { form, onSubmit };
}
