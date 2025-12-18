import useModal from "@/components/Modal/useModal";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const { open, close } = useModal();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        open([{ modalId: "search", openId: search }]);
      } else {
        close(["search"]);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [close, open, search]);

  return (
    <div className="relative mt-4 w-full">
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-input h-10 w-full rounded-[12px] border-none pl-8 placeholder:text-[12px]"
      />
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 mt-0.5 size-3 -translate-y-1/2" />
    </div>
  );
}
