import { Button } from "@/components/animate-ui/components/buttons/button";
import { useDeleteServiceMutation } from "@/store/api/serviceApi";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteService({ id }: { id: number }) {
  const [deleteService, { isLoading }] = useDeleteServiceMutation();

  const handleDelete = async () => {
    try {
      await deleteService({ serviceId: id }).unwrap();
    } catch (error: unknown) {
      console.error("Failed to delete service:", error);
      const message =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: { message?: unknown } })?.data?.message ===
          "string"
          ? (error as { data?: { message?: string } }).data!.message
          : "Failed to delete service. Please try again.";
      toast.error(message);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={"link"}
      className="cursor-pointer rounded-[12px] text-[12px] leading-[120%] font-semibold"
      onClick={handleDelete}
      disabled={isLoading}
    >
      <Trash2 size={16} />
    </Button>
  );
}
