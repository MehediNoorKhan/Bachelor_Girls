import { Button } from "@/components/animate-ui/components/buttons/button";
import { useConfirmBookingMutation } from "@/store/api/dashboard.api";
import { toast } from "sonner";

export default function ConfirmBooking({ bookingId }: { bookingId: number }) {
  const [confirmBooking, { isLoading }] = useConfirmBookingMutation();

  const handleConfirm = async () => {
    const toastId = toast.loading("Approving booking...");
    try {
      await confirmBooking({ bookingId });
      toast.success("Booking approved successfully!", { id: toastId });
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Failed to approve booking.", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Button
      size={"lg"}
      className="cursor-pointer"
      onClick={handleConfirm}
      disabled={isLoading}
    >
      Approve
    </Button>
  );
}
