import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import useModal from "@/components/Modal/useModal";

export default function Paginate() {
  const { open, getParams } = useModal();
  const page = getParams("page") || "1";

  const handlePageChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      const newPage = parseInt(page) + 1;
      open([
        {
          modalId: "page",
          openId: newPage.toString(),
        },
      ]);
    } else {
      const newPage = parseInt(page) - 1;
      open([
        {
          modalId: "page",
          openId: newPage.toString(),
        },
      ]);
    }
  };

  return (
    <div className="mt-[150px] flex w-full items-center justify-end">
      <p>Pages</p>
      <div className="flex items-center gap-2">
        <Button
          variant={"link"}
          size={"icon"}
          className="cursor-pointer"
          onClick={() => handlePageChange("decrease")}
          disabled={page === "1"}
        >
          <Icon src="/icons/AltArrowLeft.svg" className="size-6" />
        </Button>
        <Button
          variant={"link"}
          size={"icon"}
          className="cursor-pointer"
          onClick={() => handlePageChange("increase")}
        >
          <Icon src="/icons/AltArrowRight.svg" className="size-6" />
        </Button>
      </div>
    </div>
  );
}
