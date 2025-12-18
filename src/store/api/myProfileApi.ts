import type {
  ApiResponse,
  DuePaymentData,
  DuePaymentResponse,
  IDue,
  IUser,
  UpdatePasswordRequest,
} from "@/types";

import { apiSlice } from "./index";

export const providerProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<ApiResponse<IUser>, FormData>({
      query: (body) => ({
        url: "/profile/update",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),

    duesList: builder.query<ApiResponse<IDue[]>, void>({
      query: () => ({
        url: "/get/payment/requests",
        method: "GET",
      }),
    }),

    duePayment: builder.mutation<
      ApiResponse<DuePaymentResponse>,
      DuePaymentData
    >({
      query: (body) => ({
        url: "/pay/due/amount",
        method: "POST",
        body,
      }),
    }),

    updatePassword: builder.mutation<ApiResponse<null>, UpdatePasswordRequest>({
      query: (body) => ({
        url: "/update/password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useDuesListQuery,
  useDuePaymentMutation,
  useUpdatePasswordMutation,
} = providerProfileApi;
