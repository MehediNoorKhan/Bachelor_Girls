import Empty from "@/components/errors/Empty";
import ServiceCard from "@/components/ServiceCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useGetFavoritesQuery } from "@/store/api/serviceApi";
import BookingFilterMobile from "./BookingFilterMobile";

export default function Favorites() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data, isLoading, isError } = useGetFavoritesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading favorites</div>;
  if (data?.data.length === 0) return <div>No favorites found</div>;

  const favorites = data?.data || [];
  console.log("🚀 ~ Favorites ~ favorites:", favorites);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold capitalize md:text-[28px]">
          Saved Bookings
        </h1>
        {isMobile && <BookingFilterMobile />}
      </div>

      {favorites.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {favorites.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}
