import { Button } from "@/components/animate-ui/components/buttons/button";
import { useLogoutMutation } from "@/store/api/authApi";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Logout() {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      // Call server logout
      await logout().unwrap();

      toast.success("Logout successful", { id: toastId });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed", { id: toastId });
    } finally {
      toast.dismiss(toastId);

      // Force page refresh to clear any remaining state
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  return (
    <Button
      className="cursor-pointer font-semibold text-red-500 disabled:opacity-50"
      variant={"link"}
      onClick={handleLogout}
      disabled={isLoading}
    >
      Logout
    </Button>
  );
}
