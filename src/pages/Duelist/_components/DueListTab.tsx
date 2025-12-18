import SectionErrors from "@/components/errors/SectionErrors";
import { useGetDueListQuery } from "@/store/api/dueListApi";
import DueCard from "./DueCard";
import DueCardSkeleton from "./skelton/DueCardSkelton";

export default function DueListTab() {
  const { data, isLoading, isError } = useGetDueListQuery();

  if (isLoading) {
    return Array.from({ length: 6 }).map((_, index) => (
      <DueCardSkeleton key={index} />
    ));
  }

  if (isError) {
    return <SectionErrors />;
  }

  const dueList = data?.data || [];

  return (
    <>
      {dueList.length > 0 ? (
        dueList.map((due) => <DueCard key={due.id} due={due} />)
      ) : (
        <div>No due items found.</div>
      )}
    </>
  );
}
