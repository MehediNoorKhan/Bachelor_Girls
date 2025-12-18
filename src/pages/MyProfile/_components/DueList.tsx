import { useMediaQuery } from "@/hooks/use-media-query";
import { useDuesListQuery } from "@/store/api/myProfileApi";
import DueCard from "./DueCard";
import ProfileMenuMobile from "./ProfileMenuMobile";

export default function DueList() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data, isLoading, isError } = useDuesListQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading due list</div>;

  const dues = data?.data || [];

  return (
    <div className="w-full">
      <div className="bg-muted flex items-center justify-between rounded-[10px] p-5 text-[22px] font-semibold">
        <h4>Due List</h4>

        {isMobile && <ProfileMenuMobile />}
      </div>

      <div className="mt-[46px] grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {dues.map((due) => (
          <DueCard key={due.id} due={due} />
        ))}
      </div>
    </div>
  );
}
