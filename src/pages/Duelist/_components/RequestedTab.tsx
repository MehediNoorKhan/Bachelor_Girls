import SectionErrors from "@/components/errors/SectionErrors";
import { useGetDueRequestedListQuery } from "@/store/api/dueListApi";
import RequestDueCard from "./RequestDueCard";
import DueCardSkeleton from "./skelton/DueCardSkelton";

export default function RequestedTab() {
  const { data, isLoading, isError } = useGetDueRequestedListQuery();

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
        dueList.map((due) => <RequestDueCard key={due.id} due={due} />)
      ) : (
        <div>No due items found.</div>
      )}
    </>
  );
}
