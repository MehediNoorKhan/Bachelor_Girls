import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/animate-ui/components/radix/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet";
import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Toggler from "@/theme/Toggler";
import type { IUser } from "@/types";
import { MenuIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router";
import Logout from "./Logout";

import Notification from "./Notification";

interface AuthHeaderProps {
  user: IUser;
}

export default function AuthHeader({ user }: AuthHeaderProps) {
  return (
    <nav className="border-primary/30 bg-background border-b">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/">
            <Icon src="/icons/logo.svg" className="size-20" />
          </Link>
          {/* Desktop Search Bar */}
          <div className="relative hidden md:block">
            <Input placeholder="Search" className="w-90 pr-16" />
            <Button className="!absolute top-0 right-0 h-9 !rounded-l-none !px-5">
              <SearchIcon className="size-5" />
            </Button>
          </div>
        </div>
        {/* Mobile menu and search */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Search Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <SearchIcon className="h-6 w-6" />
                <span className="sr-only">Search</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-screen rounded-none">
              <div className="relative">
                <Input placeholder="Search" className="w-full pr-16" />
                <Button className="!absolute top-0 right-0 h-9 !rounded-l-none !px-5">
                  <SearchIcon className="size-5" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Sheet>
            <SheetClose asChild>
              <Notification />
            </SheetClose>
            <SheetClose asChild>
              {/* <MessageDropdown /> */}
              Message
            </SheetClose>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="px-4">
              <SheetHeader>
                <SheetTitle className="mt-5 flex items-center justify-between">
                  <Link to="/">
                    <Icon src="/icons/logo.svg" className="size-20" />
                  </Link>
                  <Toggler />
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-6 flex flex-col gap-4 px-4 font-semibold">
                <li>
                  <SheetClose asChild>
                    <Link to="/my-bookings">My Bookings</Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link to="/my-profile">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8 rounded-full">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>My Profile</span>
                      </div>
                    </Link>
                  </SheetClose>
                </li>

                <li>
                  <SheetClose asChild>
                    <Logout />
                  </SheetClose>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation & Actions */}
        <ul className="hidden items-center gap-5 font-semibold lg:flex">
          <li>
            <Notification />
          </li>
          <li>
            <Link to="/my-bookings">My Bookings</Link>
          </li>
          <li>
            <Link to="/my-profile">
              <Avatar className="size-8 rounded-full">
                <AvatarImage src={user?.avatar} alt="user avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </li>

          {user && (
            <li>
              <Logout />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
