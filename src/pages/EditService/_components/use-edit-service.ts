import { objectToFormData } from "@/lib/utils";
import {
  useEditServiceMutation,
  useServiceDetailsQuery,
} from "@/store/api/serviceApi";
import type { IService } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, "Service title must be at least 2 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  duration: z.string().min(1, "Duration must be at least 1 minute"),
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
  service_at: z
    .string()
    .min(2, "Service location must be at least 2 characters"),
  location: z
    .enum(["virtual", "in-person"] as const, {
      error: "Please select a location type",
    })
    .optional(),
  is_deposite: z
    .enum(["yes", "no"], {
      error: "Please select an option for deposit",
    })
    .optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export default function useEditService() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { data } = useServiceDetailsQuery({
    serviceId: Number(serviceId),
  });

  const [editService] = useEditServiceMutation();

  // Memoize service data to prevent unnecessary re-renders
  const service = useMemo<Partial<IService>>(() => {
    return data?.data || {};
  }, [data?.data]);

  // 1. Define your form.
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      price: "",
      image: "",
      tax: "",
      service_at: "",
      location: "virtual",
      is_deposite: "no",
    },
  });

  // 2. Update form when service data loads
  useEffect(() => {
    if (service && Object.keys(service).length > 0) {
      form.reset({
        title: service.title || "",
        description: service.description || "",
        duration: service.duration ? service.duration.toString() : "",
        price: service.price?.toString() || "",
        image: service.image || "",
      });
    }
  }, [service, form]);

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Editing service...");

    try {
      if (!serviceId) throw new Error("Service ID is missing.");

      let updateData;
      if (values.image instanceof File) {
        updateData = { ...values, service_id: serviceId };
      } else {
        updateData = { ...values, image: null, service_id: serviceId };
      }

      const body = objectToFormData(updateData);

      await editService(body).unwrap();
      toast.success("Service edited successfully!", { id: toastId });
      form.reset();
      navigate("/dashboard/release-service");
    } catch (error) {
      const err = error as Error;
      console.error("Edit service failed:", err);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return { form, onSubmit };
}
