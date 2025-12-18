import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet";
import { ListFilter } from "lucide-react";
import BookingFilter from "./BookingFilter";

export default function BookingFilterMobile() {
  return (
    <Sheet>
      <SheetTrigger>
        <ListFilter />
      </SheetTrigger>
      <SheetContent className="bg-muted w-full px-2 py-16 sm:w-[400px]">
        <SheetHeader hidden />
        <SheetTitle hidden />
        <SheetDescription hidden />
        <BookingFilter />
      </SheetContent>
    </Sheet>
  );
}
