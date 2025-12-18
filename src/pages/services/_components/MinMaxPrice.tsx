import { Button } from "@/components/animate-ui/components/buttons/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

interface MinMaxPriceProps {
  PriceType: "min_price" | "max_price";
  placeholder: string;
}

export default function MinMaxPrice({
  PriceType,
  placeholder,
}: MinMaxPriceProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [inputValue, setInputValue] = useState(
    searchParams.get(PriceType) || "",
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (inputValue) {
        searchParams.set(PriceType, inputValue);
      } else {
        searchParams.delete(PriceType);
      }
      setSearchParams(searchParams, { replace: true });
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [PriceType, inputValue, searchParams, setSearchParams]);

  const handleUpdateValue = (type: "increment" | "decrement") => {
    const currentValue = inputValue ? parseInt(inputValue, 10) : 0;
    let newValue = currentValue;
    if (type === "increment") {
      newValue = currentValue + 1;
    } else if (type === "decrement" && currentValue > 0) {
      newValue = currentValue - 1;
    }
    setInputValue(newValue > 0 ? newValue.toString() : "");
  };

  return (
    <div className="bg-card relative w-full rounded-xl">
      <Input
        min={0}
        id="minPrice"
        type="number"
        className="w-full"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      <div className="bg-muted absolute top-1/2 right-0 flex -translate-y-1/2 flex-col space-y-[2px] rounded-r-2xl border-r border-l">
        <Button
          variant="outline"
          className="bg-card size-4 !rounded-none !rounded-tr-xl border-0 border-r !px-5"
          size="icon"
          onClick={() => handleUpdateValue("increment")}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-card size-4 !rounded-none !rounded-br-xl border-0 border-r !px-5"
          onClick={() => handleUpdateValue("decrement")}
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
