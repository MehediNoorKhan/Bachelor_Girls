import type {
  ApiResponse,
  CancelBookingRequest,
  IBooking,
  IBookingHistory,
  MyBookingParams,
  RescheduleRequest,
} from "@/types";

import { apiSlice } from "./index";

export const providerProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myBookings: builder.query<ApiResponse<IBooking[]>, MyBookingParams>({
      query: (params) => ({
        url: "/get/customer/booking",
        method: "GET",
        params,
      }),
    }),

    rescheduleBooking: builder.mutation<
      ApiResponse<IBooking>,
      RescheduleRequest
    >({
      query: (body) => ({
        url: "/reschedule/booking/request",
        method: "POST",
        body,
      }),
    }),

    cancelBooking: builder.mutation<
      ApiResponse<IBooking>,
      CancelBookingRequest
    >({
      query: (body) => ({
        url: "/cancel/booking/request",
        method: "POST",
        body,
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        // Optimistically update the cache
        const patchResult = dispatch(
          providerProfileApi.util.updateQueryData(
            "myBookings",
            { booking_status: undefined, date: undefined },
            (draft) => {
              draft.data = draft.data.map((booking) =>
                booking.id === arg.booking_id
                  ? { ...booking, status: "cancelled" }
                  : booking,
              );
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          // If the mutation fails, undo the optimistic update
          patchResult.undo();
        }
      },
    }),

    bookingHistory: builder.query<ApiResponse<IBookingHistory[]>, void>({
      query: () => ({
        url: "/booking-history",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useMyBookingsQuery,
  useRescheduleBookingMutation,
  useCancelBookingMutation,
  useBookingHistoryQuery,
} = providerProfileApi;
