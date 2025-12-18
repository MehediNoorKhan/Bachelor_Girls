import SearchByZipCodeForm from "./FilterByZipCodeForm";
import MinMaxPrice from "./MinMaxPrice";

export default function PriceRange() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-lg font-bold">Price Range</h1>
      <div className="mt-4 flex items-center gap-2">
        <MinMaxPrice PriceType="min_price" placeholder="Min" />
        <MinMaxPrice PriceType="max_price" placeholder="Max" />
      </div>
      <SearchByZipCodeForm />
    </div>
  );
}
