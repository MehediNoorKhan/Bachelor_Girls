import type { ApiResponse, INotification } from "@/types";
import { apiSlice } from "./index";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    notifications: builder.query<ApiResponse<INotification[]>, void>({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),
  }),
});

export const { useNotificationsQuery } = notificationApi;
