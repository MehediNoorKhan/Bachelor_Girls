import { Button } from "@/components/animate-ui/components/buttons/button";

export default function DuePayment() {
  return (
    <div className="flex gap-4">
      <Button
        type="submit"
        className="w-full flex-1 cursor-pointer rounded-[10px]"
      >
        Pay Requested
      </Button>

      <Button
        type="submit"
        className="w-full flex-1 cursor-pointer rounded-[10px]"
      >
        Full Payment
      </Button>
    </div>
  );
}
