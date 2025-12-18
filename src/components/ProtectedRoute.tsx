import { useProfileQuery } from "@/store/api/authApi";
import { Navigate, Outlet } from "react-router";
import Loading from "./Loading";

export default function ProtectedRoute() {
  const { data, isLoading } = useProfileQuery();

  if (isLoading) return <Loading />;

  if (!data?.data) return <Navigate to="?modal=authentication&tab=login" />;
  return <Outlet />;
}
