import useModal from "@/components/Modal/useModal";
import { useProfileQuery } from "@/store/api/authApi";
import { useSendMessageMutation } from "@/store/api/messageApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  message: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

export default function useMessage() {
  const { getParams } = useModal();
  const { data } = useProfileQuery();
  const receiver_id = getParams("conversation");
  const sender_id = data?.data.id;

  const [sendMessage] = useSendMessageMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!receiver_id || !sender_id)
      return toast.error("No receiver or sender ID found.");

    try {
      sendMessage({
        ...values,
        receiver_id,
        sender_id,
        conversation_id: `${sender_id}-${receiver_id}`,
      });
      form.reset();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  return { form, onSubmit };
}
