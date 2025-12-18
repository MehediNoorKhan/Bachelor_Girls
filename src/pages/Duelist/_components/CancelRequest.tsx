import { Button } from "@/components/animate-ui/components/buttons/button";
import { useCancelDueRequestMutation } from "@/store/api/dueListApi";
import { toast } from "sonner";

export default function CancelRequest({ id }: { id: string }) {
  const [cancelDueRequest, { isLoading }] = useCancelDueRequestMutation();

  const handleCancel = async () => {
    const toastId = toast.loading("Cancelling request...");
    try {
      if (!id) throw new Error("Invalid due ID");
      await cancelDueRequest({ dueId: id }).unwrap();
      // Optionally, you can add a success notification here
    } catch (error) {
      const err = error as Error;
      // Handle error, optionally show an error notification
      console.error("Failed to cancel due request:", error);
      toast.error(err.message || "Failed to cancel due request");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Button
      size={"lg"}
      variant={"destructive"}
      className="cursor-pointer rounded-[10px] border-none"
      onClick={handleCancel}
      disabled={isLoading}
    >
      Cancel
    </Button>
  );
}
