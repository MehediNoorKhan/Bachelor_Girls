import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router";

export default function HeaderSkelton() {
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

        {/* Desktop Navigation & Actions */}
        <ul className="hidden items-center gap-5 font-semibold lg:flex">
          <li>
            <Skeleton className="size-8 rounded-lg" />
          </li>
          <li>
            <Skeleton className="size-8 rounded-lg" />
          </li>
          <li>
            <Skeleton className="h-8 w-20 rounded" />
          </li>
          <li>
            <Skeleton className="size-[50px] rounded-full" />
          </li>
          {/* {user && (
           <li>
             <Logout />
           </li>
         )} */}
        </ul>
      </div>
    </nav>
  );
}
