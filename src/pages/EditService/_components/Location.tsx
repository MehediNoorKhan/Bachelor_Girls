import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { ControllerRenderProps } from "react-hook-form";
import type { FormSchemaType } from "./use-edit-service";

interface LocationProps {
  field: ControllerRenderProps<FormSchemaType, "service_at">;
}

export default function Location({ field }: LocationProps) {
  const plans = [
    {
      value: "virtual",
      title: "Virtual",
    },
    {
      value: "in-person",
      title: "In-Person",
    },
  ];

  return (
    <RadioGroup value={field.value} onValueChange={field.onChange}>
      <div className="grid grid-cols-2 gap-4">
        {plans.map((plan) => {
          return (
            <Label
              key={plan.value}
              htmlFor={plan.value}
              className={cn(
                "relative w-full cursor-pointer overflow-hidden rounded-[12px] border p-2.5 transition-all",
                field.value === plan.value && "border-primary shadow-sm",
              )}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-start justify-between">
                  <RadioGroupItem value={plan.value} id={plan.value} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold">{plan.title}</h4>
                </div>
              </div>
            </Label>
          );
        })}
      </div>
    </RadioGroup>
  );
}
