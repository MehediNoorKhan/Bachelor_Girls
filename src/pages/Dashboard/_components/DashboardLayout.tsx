import { useProfileQuery } from "@/store/api/authApi";
import { Navigate, Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import Modals from "@/components/Modal";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  const { data, isLoading } = useProfileQuery();

  if (isLoading) return <div>Loading...</div>;

  const user = data?.data;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== "owner") {
    return <div>Access Denied. You are not authorized to view this page.</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="border-muted/50 bg-background sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b-2">
          <div className="flex w-full items-center justify-between gap-2 pr-2.5 pl-2 md:pr-10 md:pl-4">
            <SidebarTrigger />
            <Navbar />
          </div>
        </header>
        <Outlet />
        <Modals />
      </SidebarInset>
    </SidebarProvider>
  );
}
