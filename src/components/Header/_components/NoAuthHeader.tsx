import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import useModal from "@/components/Modal/useModal";
import { Link } from "react-router";
import MobileMenu from "./MobileMenu";

export default function NoAuthHeader() {
  const { open } = useModal();

  return (
    <header>
      <nav className="border-primary/30 bg-background border-b max-xl:px-2">
        <div className="container mx-auto flex h-20 items-center justify-between">
          <Link to="/">
            <Icon src="/icons/logo.svg" className="size-20" />
          </Link>
          {/* Mobile Menu Trigger */}
          <MobileMenu />
          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 font-semibold lg:flex">
            <li>
              <Button
                variant={"link"}
                className="text-foreground cursor-pointer"
              >
                <a href="/all-services">Browse Services</a>
              </Button>
            </li>
            <li>
              <Button
                onClick={() =>
                  open([
                    { modalId: "modal", openId: "seller-authentication" },
                    { modalId: "tab", openId: "seller-register" },
                  ])
                }
                variant={"link"}
                className="text-foreground cursor-pointer"
              >
                Sell Your Services
              </Button>
            </li>

            <li>
              <Button
                onClick={() =>
                  open([
                    { modalId: "modal", openId: "authentication" },
                    { modalId: "tab", openId: "login" },
                  ])
                }
                variant={"link"}
                className="text-foreground cursor-pointer"
              >
                Log In
              </Button>
            </li>
            <li>
              <Button
                onClick={() =>
                  open([
                    { modalId: "modal", openId: "authentication" },
                    { modalId: "tab", openId: "signup" },
                  ])
                }
                variant={"outline"}
                className="text-primary border-primary cursor-pointer rounded-md border-2 px-5 py-1.5"
              >
                Sign Up
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
