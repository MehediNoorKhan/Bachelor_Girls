import SectionErrors from "@/components/errors/SectionErrors";
import CategoriesSectionSkelton from "@/pages/home/skelaton/CategoriesSectionSkelton";
import { useCategoriesQuery } from "@/store/api/homeApi";
import { Link } from "react-router";

export default function Categories() {
  const { data, isLoading, isError } = useCategoriesQuery();
  const categories = data?.data || [];

  if (isLoading) {
    return <CategoriesSectionSkelton />;
  }

  if (isError) {
    return <SectionErrors />;
  }

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              to={`/all-services?categories=${category.id}`}
              key={category.id}
              className="flex cursor-pointer flex-col justify-center gap-2 rounded-2xl px-4 py-4 shadow-[0_1px_10px_0_rgba(0,0,0,0.2)] lg:items-center"
            >
              <div className="flex items-center gap-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="size-10 rounded-full object-cover"
                />
                <p className="text-base font-medium text-wrap md:text-lg xl:text-2xl">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
