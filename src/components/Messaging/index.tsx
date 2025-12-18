import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import Icon from "../Icon";
import useModal from "../Modal/useModal";
import { Button } from "../animate-ui/components/buttons/button";
import Conversations from "./_components/Conversations";
import Messages from "./_components/Messages";
import Search from "./_components/Search";

export default function Messaging() {
  const { getParams, close } = useModal();
  const conversation = getParams("conversation");
  const isConversation = Boolean(conversation);
  const [openId, setOpenId] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close(["conversation", "conversationId", "name"]);
      return setOpenId(false);
    }
    setOpenId(true);
  };

  return (
    <Popover open={openId} onOpenChange={handleOpenChange}>
      <PopoverTrigger className="sticky bottom-4 left-4 z-[99999] flex cursor-pointer rounded-full bg-white p-4 shadow-[0_4px_20.5px_0_rgba(0,0,0,0.07)] md:max-w-md md:px-6 md:py-4">
        <div className="flex items-center gap-4">
          <Icon
            src="/icons/Message square.svg"
            className="text-primary size-6 md:size-10"
          />
          <span className="flex flex-col items-start max-md:hidden">
            <span className="text-2xl font-bold">Messages</span>
            <span className="text-muted-foreground text-start text-sm">
              Providers and Customers Messages
            </span>
          </span>
        </div>
      </PopoverTrigger>

      {!isConversation && (
        <PopoverContent className="relative left-4 w-full rounded-[10px] border-none bg-white md:w-[450px]">
          <div className="flex items-center justify-between border-b pb-4">
            <h4 className="text-lg font-semibold">Messages</h4>
            <div className="flex items-center">
              <Button
                variant={"link"}
                className="text-primary cursor-pointer text-sm"
              >
                Mark all read
              </Button>
              <Button
                variant={"link"}
                className="cursor-pointer"
                onClick={() => handleOpenChange(!open)}
              >
                <Icon src="/icons/close.svg" className="size-3" />
              </Button>
            </div>
          </div>

          <Search />
          <Conversations />
        </PopoverContent>
      )}

      {isConversation && (
        <PopoverContent className="relative left-4 w-full rounded-[10px] border-none bg-white md:w-[450px]">
          <div className="flex items-center justify-between border-b pb-4">
            <Button
              variant={"link"}
              className="text-foreground cursor-pointer text-lg font-semibold no-underline"
              onClick={() => close(["conversation", "conversationId", "name"])}
            >
              <Icon src="/icons/arrow-left.svg" className="size-4" />
              <span className="no-underline">Back</span>
            </Button>

            <h4 className="text-lg font-semibold">Messages</h4>

            <Button
              variant={"link"}
              className="cursor-pointer"
              onClick={() => handleOpenChange(!open)}
            >
              <Icon src="/icons/close.svg" className="size-3" />
            </Button>
          </div>

          <Messages />
        </PopoverContent>
      )}
    </Popover>
  );
}
