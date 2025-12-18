import { Button } from "@/components/animate-ui/components/buttons/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";

export default function ServicesHeader() {
  return (
    <section className="gap-5 p-2 md:p-10">
      <div className="flex items-center justify-between">
        <h3 className="text-[26px] leading-[120%] font-bold">All Services</h3>
        <div className="flex w-full max-w-xs items-center justify-between">
          {/* <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-normal text-[#6B6B6B]">Select</span>
            <Button
              size={"sm"}
              className="cursor-pointer text-sm leading-[120%] font-bold"
            >
              <Trash2 size={20} />
              <span>Delete</span>
            </Button>
          </div> */}
          <Link to="/dashboard/add-service">
            <Button
              size={"sm"}
              className="cursor-pointer text-sm leading-[120%] font-bold"
            >
              <Plus size={20} />
              <span>Add</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
