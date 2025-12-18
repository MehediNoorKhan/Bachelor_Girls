import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet";
import Icon from "@/components/Icon";
import useModal from "@/components/Modal/useModal";
import Toggler from "@/theme/Toggler";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router";

export default function MobileMenu() {
  const { open } = useModal();

  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full px-4 sm:max-w-xs">
        <SheetHeader className="mt-4 flex w-full flex-row items-center justify-between">
          <SheetTitle>
            <Link to="/">
              <Icon src="/icons/logo.svg" className="size-20" />
            </Link>
          </SheetTitle>

          <Toggler />
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
          <SheetClose asChild>
            <Link to="/#services" className="text-lg font-semibold">
              Browse Services
            </Link>
          </SheetClose>
          <SheetClose
            onClick={() =>
              open([
                { modalId: "modal", openId: "seller-authentication" },
                { modalId: "tab", openId: "seller-register" },
              ])
            }
            className="text-start text-lg font-semibold"
          >
            Sell Your Services
          </SheetClose>
          <SheetClose
            onClick={() =>
              open([
                { modalId: "modal", openId: "authentication" },
                { modalId: "tab", openId: "login" },
              ])
            }
            className="text-start text-lg font-semibold"
          >
            Log In
          </SheetClose>
          <SheetClose
            onClick={() =>
              open([
                { modalId: "modal", openId: "authentication" },
                { modalId: "tab", openId: "signup" },
              ])
            }
            className="text-start text-lg font-semibold"
          >
            Sign Up
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
