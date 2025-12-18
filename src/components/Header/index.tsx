import { useProfileQuery } from "@/store/api/authApi";
import AuthHeader from "./_components/AuthHeader";
import NoAuthHeader from "./_components/NoAuthHeader";
import HeaderSkelton from "./skelton/HeaderSkelton";

export default function Header() {
  const { data, isLoading } = useProfileQuery();

  if (isLoading) {
    return <HeaderSkelton />;
  }

  const user = data?.data || null;

  return user ? <AuthHeader user={user} /> : <NoAuthHeader />;
}
