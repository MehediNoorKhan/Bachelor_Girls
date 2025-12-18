import useModal from "@/components/Modal/useModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IConversation } from "@/types";
interface ConversationCardProps {
  conversation: IConversation;
}

export default function ConversationCard({
  conversation,
}: ConversationCardProps) {
  const { open } = useModal();

  return (
    <button
      onClick={() =>
        open([
          { modalId: "conversation", openId: conversation.user.id.toString() },
          {
            modalId: "conversationId",
            openId: conversation.conversation_id.toString(),
          },
          {
            modalId: "name",
            openId: conversation.user.name,
          },
        ])
      }
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] bg-[#F0F1F4] p-[14px]"
    >
      <Avatar className="size-[51px]">
        <AvatarImage src={conversation.user.avatar} />
        <AvatarFallback>
          {conversation.user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="w-full space-y-1">
        <div className="flex w-full justify-between">
          <h3 className="text-sm font-semibold">{conversation.user.name}</h3>
          <span className="text-muted-foreground text-[12px] font-normal">
            {conversation.last_message.created_at}
          </span>
        </div>
        <p className="text-muted-foreground line-clamp-1 text-start text-sm">
          {conversation.last_message.message}
        </p>
      </div>
    </button>
  );
}
