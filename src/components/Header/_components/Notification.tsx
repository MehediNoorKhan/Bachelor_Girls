import { Button } from "@/components/ui/button";

import Icon from "@/components/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotificationsQuery } from "@/store/api/notificationApi";
import type { INotification } from "@/types";
import { Dot, XIcon } from "lucide-react";
import { Link } from "react-router";

export default function Notification() {
  const { data, isLoading, isError } = useNotificationsQuery();

  if (isLoading) return <Skeleton className="size-8 rounded-lg" />;

  const notifications = data?.data || ([] as INotification[]);

  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="bg-primary/10 size-8">
            <Icon src="/icons/notification-bing.svg" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[28.125rem] space-y-2 px-4 py-2.5 max-[450px]:w-[20rem]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Notifications</h3>

            <div className="flex items-center gap-1.5">
              <Button variant="link">Mark all read</Button>
              <DropdownMenuItem className="cursor-pointer">
                <XIcon />
              </DropdownMenuItem>
            </div>
          </div>

          <DropdownMenuSeparator />

          {isError && (
            <p className="text-center text-sm text-red-500">
              Failed to load notifications.
            </p>
          )}

          {!isError && (
            <ScrollArea className="h-[35rem]">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-background my-3.5 rounded-xl p-2.5"
                >
                  <div className="flex items-start">
                    <div className="space-y-2.5">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {notification.message}
                      <p className="text-muted-foreground text-xs">
                        {notification.description}
                      </p>
                    </div>
                    <div className="ml-auto flex">
                      {!notification.isRead && (
                        <Dot className="text-primary size-16" />
                      )}
                      <XIcon className="size-4" />
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}

          <DropdownMenuSeparator />

          <Link
            to="/dashboard/all-notifications"
            className="flex justify-center"
          >
            <Button variant="link">View all notifications</Button>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
