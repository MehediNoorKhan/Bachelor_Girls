import type { ApiResponse } from "@/types";
import type { IConversation, IMessage } from "@/types/conversation";
import { apiSlice } from "./index";
export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    conversations: builder.query<ApiResponse<IConversation[]>, void>({
      query: () => ({
        url: "/chat/top-users",
        method: "GET",
      }),
    }),

    messages: builder.query<
      ApiResponse<IMessage[]>,
      { conversations: string | null }
    >({
      query: ({ conversations }) => ({
        url: `/chat/get/${conversations}`,
        method: "GET",
      }),
    }),

    sendMessage: builder.mutation<ApiResponse<IMessage>, Partial<IMessage>>({
      query: (body) => ({
        url: "/chat/send",
        method: "POST",
        body,
      }),
      // Optimistic update for messages cache
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const tempId = Date.now();

        const patchResult = dispatch(
          messageApi.util.updateQueryData(
            "messages",
            { conversations: arg.receiver_id || "" },
            (draft) => {
              if (draft.data) {
                const optimisticMessage = {
                  id: tempId, // Temporary ID
                  sender_id: arg.sender_id || "",
                  receiver_id: arg.receiver_id || "",
                  message: arg.message || "",
                  conversation_id: arg.conversation_id || "",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                };

                draft.data.push(optimisticMessage);
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(
            "📤 API: Error occurred, undoing optimistic update:",
            error,
          );
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useConversationsQuery,
  useMessagesQuery,
  useSendMessageMutation,
} = messageApi;
