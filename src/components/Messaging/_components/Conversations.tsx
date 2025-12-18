import Empty from "@/components/errors/Empty";
import SectionErrors from "@/components/errors/SectionErrors";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversationsQuery } from "@/store/api/messageApi";
import ConversationCard from "./ConversationCard";
import ConversationSkelton from "./skelton/ConversationSkelton";
export default function Conversations() {
  const { data, isLoading, isError } = useConversationsQuery();

  if (isLoading) return <ConversationSkelton />;
  if (isError) return <SectionErrors />;

  const conversations = data?.data || [];

  return (
    <ScrollArea className="mt-4 h-[500px] rounded-md border border-none pr-4">
      <div className="space-y-4">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationCard
              key={conversation.user.id}
              conversation={conversation}
            />
          ))
        ) : (
          <div className="flex items-center justify-center">
            <Empty text="No conversations found." />
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
