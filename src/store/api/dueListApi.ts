import type { ApiResponse, DueList, DueRequestList } from "@/types";
import { apiSlice } from ".";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDueList: builder.query<ApiResponse<DueList>, void>({
      query: () => ({
        url: "/get/due/list",
        method: "GET",
      }),
      providesTags: ["DueList"],
    }),

    getDueRequestedList: builder.query<ApiResponse<DueRequestList>, void>({
      query: () => ({
        url: "/get/due/payment/request/list",
        method: "GET",
      }),
      providesTags: ["RequestDueList"],
    }),

    requestCustomDuePayment: builder.mutation<
      ApiResponse<null>,
      { booking_id: string; amount: number; note: string }
    >({
      query: (body) => ({
        url: "due/payment/custom", //Update for Hand cash
        method: "POST",
        body,
      }),
      invalidatesTags: ["DueList"],
    }),

    requestFullPayment: builder.mutation<
      ApiResponse<null>,
      { booking_id: string; requested_amount: number; note: string }
    >({
      query: (body) => ({
        url: "/due/payment/request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DueList", "RequestDueList"],
    }),

    cancelDueRequest: builder.mutation<ApiResponse<null>, { dueId: string }>({
      query: ({ dueId }) => ({
        url: `/cancel/due/payment/request/${dueId}`,
        method: "GET",
      }),
      invalidatesTags: ["RequestDueList"],
    }),
  }),
});

export const {
  useGetDueListQuery,
  useGetDueRequestedListQuery,
  useRequestCustomDuePaymentMutation,
  useRequestFullPaymentMutation,
  useCancelDueRequestMutation,
} = dashboardApi;
