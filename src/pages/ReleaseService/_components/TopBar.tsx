import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";

export default function TopBar() {
  return (
    <section className="gap-5 p-2 md:p-10">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <Button variant={"link"} className="m-0 cursor-pointer p-0">
            <Icon src="/icons/arrow-left.svg" className="size-4" />
          </Button>
          <span className="bg-border block h-6 w-0.5" />
          <h1 className="text-[26px] font-medium">Service Page</h1>
        </div>
      </div>
    </section>
  );
}
