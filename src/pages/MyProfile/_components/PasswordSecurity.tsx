import { useMediaQuery } from "@/hooks/use-media-query";
import PasswordForm from "./PasswordForm";
import ProfileMenuMobile from "./ProfileMenuMobile";

export default function PasswordSecurity() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full">
      <div className="bg-muted flex items-center justify-between rounded-[10px] p-5 text-[22px] font-semibold">
        <h4>Password/Security</h4>

        {isMobile && <ProfileMenuMobile />}
      </div>

      <PasswordForm />
    </div>
  );
}
