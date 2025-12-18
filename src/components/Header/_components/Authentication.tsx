import useModal from "@/components/Modal/useModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Authentication() {
  const { open } = useModal();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "login";

  return (
    <div className="relative sm:w-[45dvw]">
      <div className="absolute inset-0 -z-1 size-full rotate-4 rounded-2xl bg-[#DD9778]" />
      <div className="absolute bottom-10 left-16 space-y-1 rounded-tl-2xl rounded-br-2xl bg-white/10 px-12 py-3 backdrop-blur-sm max-2xl:hidden">
        <p className="text-center text-xs text-white">Welcome to the Nest</p>
        <p className="text-center text-xs text-white">
          For Seamless Scheduling
        </p>
        <span className="mt-4 flex items-center justify-center gap-1">
          <span className="block size-1.5 rounded-full bg-white" />
          <span className="block size-2 rounded-full bg-white" />
          <span className="grid size-3 place-content-center rounded-full bg-white">
            <span className="block size-1.5 rounded-full border border-black/50 bg-white" />
          </span>
          <span className="block size-2 rounded-full bg-white" />
          <span className="block size-1.5 rounded-full bg-white" />
        </span>
      </div>

      <div className="flex size-full w-full justify-end rounded-2xl bg-[url('/images/authPageBg.jpg')] bg-cover bg-fixed bg-position-[center_right_11dvw] bg-no-repeat">
        <div className="bg-background grid w-full max-w-[500px] place-items-center rounded-2xl p-8">
          <Tabs value={tab} className="max-w-md">
            <h1 className="py-4 text-2xl font-semibold">
              {tab === "login"
                ? "Log in your account!"
                : "Create a new account"}
            </h1>

            <TabsList className="mb-6 w-full gap-6 bg-transparent !font-normal">
              <TabsTrigger
                value="login"
                className="data-[state=active]:border-primary rounded-none border-t-0 border-r-0 border-b-2 border-l-0 border-transparent bg-transparent pb-5 text-lg font-normal whitespace-nowrap shadow-none data-[state=active]:rounded-none data-[state=active]:shadow-none"
                onClick={() => open([{ modalId: "tab", openId: "login" }])}
              >
                Log In
              </TabsTrigger>

              <TabsTrigger
                value="signup"
                className="data-[state=active]:border-primary rounded-none border-t-0 border-r-0 border-b-2 border-l-0 border-transparent bg-transparent pb-5 text-lg font-normal whitespace-nowrap shadow-none data-[state=active]:rounded-none data-[state=active]:shadow-none"
                onClick={() => open([{ modalId: "tab", openId: "signup" }])}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
