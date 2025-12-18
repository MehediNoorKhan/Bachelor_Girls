import { Button } from "@/components/animate-ui/components/buttons/button";
import { useRejectBookingMutation } from "@/store/api/dashboard.api";
import { toast } from "sonner";

export default function RejectBooking({ bookingId }: { bookingId: number }) {
  const [rejectBooking] = useRejectBookingMutation();

  const handleReject = async () => {
    const toastId = toast.loading("Rejecting booking...");
    try {
      await rejectBooking({ bookingId }).unwrap();
      toast.success("Booking rejected successfully");
    } catch (error) {
      console.error("Failed to reject booking:", error);
      toast.error("Failed to reject booking");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Button
      variant={"secondary"}
      size={"lg"}
      className="cursor-pointer"
      onClick={handleReject}
    >
      Reject
    </Button>
  );
}
