import type {
  ApiResponse,
  BookingsData,
  DashboardData,
  ReviewsResponse,
} from "@/types";
import { apiSlice } from ".";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<ApiResponse<DashboardData>, void>({
      query: () => ({
        url: "dashboard/overviews",
        method: "GET",
      }),
    }),

    getBookings: builder.query<ApiResponse<BookingsData>, void>({
      query: () => ({
        url: "/get/owner/booking",
        method: "GET",
        params: { status: "pending" },
      }),
    }),

    confirmBooking: builder.mutation<ApiResponse<null>, { bookingId: number }>({
      query: ({ bookingId }) => ({
        url: "/booking/status",
        method: "POST",
        body: { booking_id: bookingId, status: "confirmed" },
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          dashboardApi.util.updateQueryData(
            "getBookings",
            undefined,
            (draft) => {
              if (draft.data) {
                draft.data.bookings = draft.data.bookings.filter(
                  (booking) => booking.id !== arg.bookingId,
                );
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

    rejectBooking: builder.mutation<ApiResponse<null>, { bookingId: number }>({
      query: ({ bookingId }) => ({
        url: "/booking/status",
        method: "POST",
        body: { booking_id: bookingId, status: "cancelled" },
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          dashboardApi.util.updateQueryData(
            "getBookings",
            undefined,
            (draft) => {
              if (draft.data) {
                draft.data.bookings = draft.data.bookings.filter(
                  (booking) => booking.id !== arg.bookingId,
                );
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

    getReviews: builder.query<ApiResponse<ReviewsResponse>, void>({
      query: () => ({
        url: "/review/getOwnerReviews",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetBookingsQuery,
  useConfirmBookingMutation,
  useRejectBookingMutation,
  useGetReviewsQuery,
} = dashboardApi;
