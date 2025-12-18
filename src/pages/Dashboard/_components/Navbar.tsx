import Notification from "@/components/Header/_components/Notification";
import ThemeToggler from "@/components/Header/_components/ThemeToggler";
import Profile from "@/components/Profile";
import Fullscreen from "./Fullscreen";

export default function Navbar() {
  return (
    <div className="flex items-center gap-5">
      <ThemeToggler />
      <Fullscreen />
      <Notification />
      <Profile />
    </div>
  );
}
