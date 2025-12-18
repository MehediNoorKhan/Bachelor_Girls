import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet";
import { Settings2 } from "lucide-react";
import Filters from "./Filters";
export default function MobileFilters() {
  return (
    <Sheet>
      <SheetTrigger>
        <Settings2 />
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-sm">
        <SheetHeader hidden />
        <SheetTitle hidden />
        <SheetDescription hidden />
        <Filters className="h-full rounded-none" />
      </SheetContent>
    </Sheet>
  );
}
