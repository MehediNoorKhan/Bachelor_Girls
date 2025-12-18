import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";

export default function Sorting() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "";

  const handleSortChange = (value: string) => {
    if (value === "clear") {
      searchParams.delete("type");
    } else {
      searchParams.set("type", value);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <Select onValueChange={handleSortChange} value={type}>
      <SelectTrigger className="border-border w-[100px] border shadow-none sm:w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="clear">Clear</SelectItem>
        <SelectItem value="low_high">Price: Low to High</SelectItem>
        <SelectItem value="high_low">Price: High to Low</SelectItem>
        <SelectItem value="ratings">Rating</SelectItem>
      </SelectContent>
    </Select>
  );
}
