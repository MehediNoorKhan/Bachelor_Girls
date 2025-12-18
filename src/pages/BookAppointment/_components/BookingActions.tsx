import { Button } from "@/components/animate-ui/components/buttons/button";
import useModal from "@/components/Modal/useModal";

interface BookingActionsProps {
  isLoading?: boolean;
  isError?: boolean;
}

export default function BookingActions({
  isLoading,
  isError,
}: BookingActionsProps) {
  const { close } = useModal();

  return (
    <div className="flex w-full gap-5">
      <Button
        type="button"
        size={"lg"}
        variant={"outline"}
        className="border-primary text-primary flex-1 rounded-xl"
        onClick={() => close(["modal", "date", "time"])}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        size={"lg"}
        className="flex-1 rounded-xl"
        disabled={isLoading || isError}
      >
        Confirm
      </Button>
    </div>
  );
}
