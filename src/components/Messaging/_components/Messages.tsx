import SectionErrors from "@/components/errors/SectionErrors";
import useModal from "@/components/Modal/useModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import socket from "@/config/socket";
import type { AppDispatch } from "@/store"; // Import proper dispatch type
import { useProfileQuery } from "@/store/api/authApi";
import { messageApi, useMessagesQuery } from "@/store/api/messageApi";
import type { IMessage } from "@/types";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import Message from "./Message";
import MessageForm from "./MessageForm";
import MessageSkelton from "./skelton/MessageSkelton";

export default function Messages() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: profile } = useProfileQuery();
  const userId = profile?.data?.id || null;

  const { getParams } = useModal();
  const conversations = getParams("conversation");
  const conversationId = getParams("conversationId");
  const name = getParams("name");

  useEffect(() => {
    if (!conversationId || !userId) return;

    const messageId = `chat-conversation.${conversationId}`;
    const channel = socket.private(messageId);

    const messageListener = (message: IMessage) => {
      if (userId === message.sender_id) return;

      dispatch(
        messageApi.util.updateQueryData(
          "messages",
          { conversations },
          (draft) => {
            if (draft.data) {
              // ✅ Use the actual message data received from backend
              const newMessage = {
                id: message.id || Date.now(),
                sender_id: message.sender_id,
                receiver_id: message.receiver_id,
                message: message.message,
                conversation_id: conversations || "",
                created_at: message.created_at || new Date().toISOString(),
                updated_at: message.updated_at || new Date().toISOString(),
              };

              // ✅ Check if message already exists to prevent duplicates
              const existingMessage = draft.data.find(
                (msg) => msg.id === newMessage.id,
              );
              if (!existingMessage) {
                draft.data.push(newMessage);
                console.log(
                  `✅ Message added to cache. Total messages: ${draft.data.length}`,
                );
              } else {
                console.log(
                  `⚠️ Message already exists in cache: ${newMessage.id}`,
                );
              }
            }
          },
        ),
      );
    };

    channel.listen("ChatMessageSent", messageListener);

    return () => {
      channel.stopListening("ChatMessageSent", messageListener);
      socket.leaveChannel(`private-chat-conversation.${conversationId}`);
    };
  }, [conversationId, conversations, dispatch, userId]);

  const { data, isLoading, isError } = useMessagesQuery(
    { conversations },
    {
      skip: !conversations,
      pollingInterval: 0,
    },
  );

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoading) return <MessageSkelton />;
  if (isError) return <SectionErrors />;

  return (
    <div>
      <h3 className="border-b py-4 text-lg font-semibold">{name}</h3>
      <ScrollArea
        ref={scrollAreaRef}
        className="h-[500px] rounded-md pt-2 pr-4 pb-4"
      >
        <div className="mt-8 space-y-4">
          {messages.length === 0 && <div>No messages</div>}
          {messages.length > 0 &&
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <MessageForm />
    </div>
  );
}
