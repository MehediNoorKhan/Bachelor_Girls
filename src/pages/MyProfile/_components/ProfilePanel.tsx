import { useMediaQuery } from "@/hooks/use-media-query";
import { Outlet } from "react-router";
import ProfileMenu from "./ProfileMenu";

export default function ProfilePanel() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section>
      <div className="container mx-auto flex gap-x-10 max-2xl:px-4">
        {!isMobile && (
          <div className="bg-muted rounded-[10px] p-5">
            <ProfileMenu />
          </div>
        )}

        <Outlet />
      </div>
    </section>
  );
}
