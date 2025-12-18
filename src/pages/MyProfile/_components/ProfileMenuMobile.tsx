import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { Fragment } from "react/jsx-runtime";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet";
import { SquareMenu } from "lucide-react";

export default function ProfileMenuMobile() {
  return (
    <Sheet>
      <SheetTrigger>
        <SquareMenu />
      </SheetTrigger>
      <SheetContent className="p-4 max-sm:w-full sm:max-w-sm">
        <SheetHeader hidden />
        <SheetTitle hidden />
        <SheetDescription hidden />

        <div>
          <div className="flex items-center gap-5">
            <Avatar className="size-[60px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold">John Doe</h2>
              <p className="text-muted-foreground text-sm">
                john.doe@example.com
              </p>
            </div>
            <Button variant={"link"} size={"icon"} className="text-foreground">
              <Icon src="/icons/chevron-right.svg" />
            </Button>
          </div>

          <ul className="mt-10 flex flex-col gap-5">
            {menuItems.map((item) => (
              <SheetClose asChild>
                <li key={item.href}>
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-[8px] bg-white p-2.5 text-lg",
                        {
                          "bg-primary text-white": isActive,
                        },
                      )
                    }
                  >
                    {({ isActive }) => (
                      <Fragment>
                        <span className="flex w-full items-center gap-3">
                          <span
                            className={cn(
                              "bg-muted rounded-full border border-[#EBEBEB] p-2",
                              { "border-[#DC906D] bg-[#DB8B67]": isActive },
                            )}
                          >
                            <Icon src={item.icon} className="size-6" />
                          </span>
                          <span>{item.label}</span>
                        </span>
                        <Icon src="/icons/chevron-right.svg" />
                      </Fragment>
                    )}
                  </NavLink>
                </li>
              </SheetClose>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const menuItems = [
  {
    label: "Profile Info",
    href: "/my-profile/profile-info",
    icon: "/icons/Profile.svg",
  },
  {
    label: "Password/Security",
    href: "/my-profile/password-security",
    icon: "/icons/shield-security.svg",
  },
  {
    label: "Due List",
    href: "/my-profile/due-list",
    icon: "/icons/calender_due.svg",
  },
  {
    label: "Payment History",
    href: "/my-profile/payment-history",
    icon: "/icons/payment_history.svg",
  },
];
