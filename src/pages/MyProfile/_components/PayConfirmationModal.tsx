import { Button } from "@/components/animate-ui/components/buttons/button";
import useModal from "@/components/Modal/useModal";
import { useDuePaymentMutation } from "@/store/api/myProfileApi";
import { toast } from "sonner";

export default function PayConfirmationModal() {
  const { getParams, close } = useModal();
  const amount = getParams("amount");
  const dueId = getParams("due_id");
  const type = getParams("type") || undefined;

  const [duePayment, { isLoading }] = useDuePaymentMutation();

  const handleDuePayment = async () => {
    if (!amount || !dueId) return toast.error("Invalid amount or due ID");

    const toastId = toast.loading("Processing payment...");

    try {
      const result = await duePayment({
        due_id: atob(dueId),
        type: type,
      }).unwrap();

      // Close the modal after successful payment
      if (result?.data?.checkout_url) {
        window.open(result.data.checkout_url, "_blank");
      }

      close(["modal", "amount", "due_id", "type"]); // Close both modals
      toast.success("Payment successful!", { id: toastId });
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.", { id: toastId });
      // Handle error (e.g., show a notification)
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="bg-background sm:[15dvw] rounded-[12px] p-4">
      <h2 className="border-b pb-3 text-lg font-semibold">
        Payment Confirmation
      </h2>
      <p className="mt-4">
        You are about to pay an amount of{" "}
        <span className="text-primary font-bold">
          ${amount ? atob(amount) : "0.00"}
        </span>
        . Please confirm to proceed with the payment.
      </p>
      <div className="mt-6 flex justify-end gap-4">
        <Button
          variant={"outline"}
          className="cursor-pointer rounded-[10px] px-4 py-2 text-sm font-medium"
          onClick={() => close(["modal", "amount"])} // Close both modals
        >
          Cancel
        </Button>
        <Button
          className="cursor-pointer rounded-[10px] px-4 py-2 text-sm font-medium"
          onClick={handleDuePayment}
          disabled={isLoading}
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );
}
