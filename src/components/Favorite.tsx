import { cn } from "@/lib/utils";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/store/api/serviceApi";
import { Heart } from "lucide-react";
import { Button } from "./animate-ui/components/buttons/button";

export default function Favorite({ serviceId }: { serviceId: number }) {
  const { data, isLoading: isFetching, refetch } = useGetFavoritesQuery();
  const [addFavorite, { isLoading: isAdding }] = useAddFavoriteMutation();
  const [removeFavorite, { isLoading: isRemoving }] =
    useRemoveFavoriteMutation();

  const isFavorite = data?.data?.some(
    (favService) => favService.id === serviceId,
  );

  const handleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite({ id: serviceId });
    } else {
      await addFavorite({ id: serviceId });
    }
    // Force refetch after mutation
    setTimeout(() => refetch(), 100);
  };

  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      className={cn("cursor-pointer rounded-full", {
        "bg-primary text-white": isFavorite,
      })}
      onClick={handleFavorite}
      disabled={isFetching || isAdding || isRemoving}
    >
      <Heart size={34} />
    </Button>
  );
}
