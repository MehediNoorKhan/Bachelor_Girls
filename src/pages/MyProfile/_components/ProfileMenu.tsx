import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useProfileQuery } from "@/store/api/authApi";
import type { IUser } from "@/types";
import { NavLink } from "react-router";
import { Fragment } from "react/jsx-runtime";

export default function ProfileMenu() {
  const { data } = useProfileQuery();
  const user = data?.data || ({} as IUser);

  return (
    <div>
      <div className="flex items-center gap-5">
        <Avatar className="size-[60px]">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-bold">{user.name || "John Doe"}</h2>
          <p className="text-muted-foreground text-sm">
            {user.email || "john.doe@example.com"}
          </p>
        </div>
        <Button variant={"link"} size={"icon"} className="text-foreground">
          <Icon src="/icons/chevron-right.svg" />
        </Button>
      </div>

      <ul className="mt-10 flex flex-col gap-5">
        {menuItems.map((item) => (
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
        ))}
      </ul>
    </div>
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
    href: "password-security",
    icon: "/icons/shield-security.svg",
  },
  {
    label: "Due List",
    href: "due-list",
    icon: "/icons/calender_due.svg",
  },
];
