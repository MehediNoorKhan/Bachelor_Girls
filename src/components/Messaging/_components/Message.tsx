import SectionErrors from "@/components/errors/SectionErrors";
import { cn } from "@/lib/utils";
import { useProfileQuery } from "@/store/api/authApi";
import type { IMessage, IUser } from "@/types";
import { formatTimeAgo } from "@/utils/dateFormate";
import MessageSkelton from "./skelton/MessageSkelton";

interface MessageProps {
  message: IMessage;
}

export default function Message({ message }: MessageProps) {
  const { data, isLoading, isError } = useProfileQuery();

  if (isLoading) return <MessageSkelton />;
  if (isError) return <SectionErrors />;

  const user = data?.data || ({} as IUser);

  return (
    <div
      className={cn("bg-muted max-w-[350px] rounded-[10px] p-[14px]", {
        "ml-auto bg-[#F4D9CE]": message.sender_id === user?.id,
      })}
    >
      <p className="text-sm">{message.message}</p>
      <span className="text-muted-foreground text-[12px] font-normal">
        {formatTimeAgo(message.created_at)}
      </span>
    </div>
  );
}
