import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Messaging from "@/components/Messaging";
import Modals from "@/components/Modal";
import { useProfileQuery } from "@/store/api/authApi";
import { Navigate, Outlet } from "react-router";

export default function HomeLayout() {
  const { data } = useProfileQuery();

  const user = data?.data || null;

  if (user?.role === "owner") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Modals />
      {user && <Messaging />}
    </>
  );
}
