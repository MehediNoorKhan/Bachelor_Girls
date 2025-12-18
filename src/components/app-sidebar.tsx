import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { useProfileQuery } from "@/store/api/authApi";
import { Link, NavLink } from "react-router";
import { Button } from "./animate-ui/components/buttons/button";
import Icon from "./Icon";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useProfileQuery();
  const user = data?.data;

  return (
    <Sidebar {...props} className="min-w-[260px] border-none">
      <SidebarHeader className="border-muted/50 h-16 border-b-2 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="flex justify-center bg-white!"
            >
              <Link to="/dashboard">
                <img
                  src="/images/dashboard-logo.svg"
                  alt="Logo"
                  className="h-[54px] w-[88px]"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Menus */}
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <div className="bg-primary space-y-2 rounded-2xl p-7 text-center text-white">
            <h4 className="text-4xl font-extrabold">
              ${Number(user?.balance).toFixed(2)}
            </h4>
            <p className="text-[22px] font-semibold">Current Balance</p>
          </div>

          <div className="mt-2 flex justify-between">
            <Button className="cursor-pointer rounded-2xl text-sm font-semibold">
              Payout Request
            </Button>
            <Button
              variant={"secondary"}
              className="text-foreground cursor-pointer rounded-2xl text-sm font-semibold"
            >
              Status
            </Button>
          </div>

          <ul className="mt-5 space-y-6">
            {navigation.map((item) => {
              if (item.href) {
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "text-foreground flex items-center gap-1 text-base font-medium",
                          {
                            "text-primary": isActive,
                          },
                        )
                      }
                      end
                    >
                      {({ isActive }) => (
                        <>
                          <Icon src={item.icon} className="size-5" />
                          <span
                            className={cn(
                              "w-full rounded-[10px] border-b-2 border-transparent px-2.5 py-1.5",
                              { "border-primary": isActive },
                            )}
                          >
                            {item.name}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              }

              if (item.submenu) {
                return (
                  <li key={item.name}>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-foreground flex cursor-pointer items-center gap-1 p-0 text-base font-medium no-underline!">
                          <Icon src={item.icon} className="size-5" />
                          <span
                            className={cn(
                              "w-full rounded-[10px] border-b-2 border-transparent px-2.5 py-1.5",
                            )}
                          >
                            {item.name}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="mt-2 space-y-2 px-4">
                            {item.submenu.map((subItem) => (
                              <li key={subItem.name}>
                                <NavLink
                                  to={subItem.href}
                                  className={({ isActive }) =>
                                    cn(
                                      "text-foreground flex items-center gap-1 text-base font-medium",
                                      {
                                        "text-primary": isActive,
                                      },
                                    )
                                  }
                                  end
                                >
                                  {({ isActive }) => (
                                    <>
                                      <Icon
                                        src={subItem.icon}
                                        className="size-5"
                                      />
                                      <span
                                        className={cn(
                                          "w-full rounded-[10px] border-b-2 border-transparent px-2.5 py-1.5",
                                          { "text-primary": isActive },
                                        )}
                                      >
                                        {subItem.name}
                                      </span>
                                    </>
                                  )}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </li>
                );
              }
            })}
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "/icons/home.svg",
  },
  {
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: "/icons/calendar-plus.svg",
  },
  {
    name: "Booking",
    href: "/dashboard/booking",
    icon: "/icons/booking.svg",
  },
  {
    name: "Due List",
    href: "/dashboard/due-list",
    icon: "/icons/due-list.svg",
  },
  {
    name: "Service",
    submenu: [
      {
        name: "Add Services",
        href: "/dashboard/add-service",
        icon: "/icons/fi-rr-add.svg",
      },
      {
        name: "Release",
        href: "/dashboard/release-service",
        icon: "/icons/press-release.svg",
      },
    ],
    icon: "/icons/Services.svg",
  },
];
