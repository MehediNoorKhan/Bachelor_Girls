import type { ApiResponse } from "@/types";
import type {
  IProviderProfile,
  IReview,
  PostReviewData,
  ReviewParams,
  ReviewsResponse,
} from "@/types/provider.profile";
import { apiSlice } from "./index";

export const providerProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    providerProfile: builder.query<ApiResponse<IProviderProfile>, string>({
      query: (id) => ({
        url: `/business/profile/${id}`,
        method: "GET",
      }),
    }),

    ownerReviews: builder.query<ApiResponse<ReviewsResponse>, ReviewParams>({
      query: (params) => ({
        url: "/review/getOwnerReview",
        method: "GET",
        params: {
          ...params,
          reviewable_type: "businessOwner",
        },
      }),
      providesTags: ["ownerReviews"],
    }),

    postReview: builder.mutation<ApiResponse<IReview>, PostReviewData>({
      query: (body) => ({
        url: "/review/store",
        method: "POST",
        body,
      }),
      async onQueryStarted(
        { reviewable_id, ...patch },
        { dispatch, queryFulfilled },
      ) {
        try {
          // Wait for the server response first
          const result = await queryFulfilled;

          // Only update cache after successful server response
          dispatch(
            providerProfileApi.util.updateQueryData(
              "ownerReviews",
              { owner_id: reviewable_id.toString() },
              (draft) => {
                if (draft.data?.reviews) {
                  const newReview = {
                    id: result.data.data.id || Math.random(), // Use real ID from server
                    customer_id: result.data.data.customer_id || 0, // Use actual customer ID from server
                    reviewable_type: patch.reviewable_type,
                    reviewable_id: reviewable_id,
                    rating: patch.rating,
                    comment: patch.comment,
                    status: result.data.data.status || "approved",
                    created_at:
                      result.data.data.created_at || new Date().toISOString(),
                    updated_at:
                      result.data.data.updated_at || new Date().toISOString(),
                    user: result.data.data.user || {
                      id: 0,
                      name: "You",
                      username: "you",
                      avatar: "",
                    },
                  };

                  draft.data.reviews.unshift(newReview);

                  if (draft.data.total_review !== undefined) {
                    draft.data.total_review += 1;
                  }
                }
              },
            ),
          );
        } catch (error) {
          // Handle error - no cache update on failure
          console.error("Failed to post review:", error);
        }
      },
    }),
  }),
});

export const {
  useProviderProfileQuery,
  useOwnerReviewsQuery,
  usePostReviewMutation,
} = providerProfileApi;
