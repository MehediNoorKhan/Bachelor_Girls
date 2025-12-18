import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
export default function SectionErrors() {
  return (
    <section className="container mx-auto my-10 flex px-4">
      <Alert variant="destructive">
        <TriangleAlert size={32} />

        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          Unable to load data. Please try again later.
        </AlertDescription>
      </Alert>
    </section>
  );
}
