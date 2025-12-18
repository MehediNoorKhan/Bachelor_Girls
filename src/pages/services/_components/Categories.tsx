import { Checkbox } from "@/components/animate-ui/components/base/checkbox";
import SectionErrors from "@/components/errors/SectionErrors";
import { Label } from "@/components/ui/label";
import { useCategoriesQuery } from "@/store/api/homeApi";
import { useState } from "react";
import { useSearchParams } from "react-router";
import CategorySkelton from "../skelton/CategorySkelton";

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("categories");
  const paramsArray = params
    ? params.split(",").map((item) => item.trim())
    : [];

  const [selected, setSelected] = useState<string[]>(paramsArray);

  const handleCheckboxChange = (id: string) => {
    let newSelected: string[];

    if (selected.includes(id)) {
      newSelected = selected.filter((item) => item !== id);
      setSelected(newSelected);
    } else {
      newSelected = [...selected, id];
      setSelected(newSelected);
    }

    if (newSelected.length > 0) {
      searchParams.set("categories", newSelected.join(","));
    } else {
      searchParams.delete("categories");
    }

    setSearchParams(searchParams, { replace: true });
  };

  const { data, isLoading, isError } = useCategoriesQuery();

  if (isLoading) return <CategorySkelton />;
  if (isError) return <SectionErrors />;

  const categories = data?.data || [];

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium">Category</h2>
      <ul className="mt-2 space-y-2">
        {categories &&
          categories.map((category) => (
            <li key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selected.includes(category.id.toString())}
                onCheckedChange={() =>
                  handleCheckboxChange(category.id.toString())
                }
                variant={"default"}
                size={"default"}
              />
              <Label htmlFor={category.id} className="text-base font-normal">
                {category.name}
              </Label>
            </li>
          ))}
      </ul>
    </div>
  );
}
