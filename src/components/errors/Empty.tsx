import { PackageOpen } from "lucide-react";

export default function Empty({
  text,
  subText,
}: {
  text?: string;
  subText?: string;
}) {
  return (
    <div className="text-primary flex h-full flex-col items-center justify-center">
      <PackageOpen size={100} strokeWidth={1} />
      <h2 className="text-center text-2xl font-medium">
        {text || "No Service Found"}
      </h2>
      <p className="text-muted-foreground text-center">
        {subText || "We couldn't find any services matching your criteria."}
      </p>
    </div>
  );
}
