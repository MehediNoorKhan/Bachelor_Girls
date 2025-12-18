import { clearStoredTokens, storeTokens } from "@/lib/tokenStorage";
import type {
  ApiResponse,
  AuthResponse,
  IUser,
  LoginRequest,
  RegisterRequest,
  VerifyOtpRequest,
} from "@/types";
import { apiSlice } from "./index";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query<ApiResponse<IUser>, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    login: builder.mutation<ApiResponse<AuthResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data.data.token.original.access_token) {
            storeTokens({
              accessToken: data.data.token.original.access_token,
              rememberMe: true, // You can adjust this based on your logic
            });
            // Optionally, you can dispatch an action to store user info in the state
            // dispatch(setUser(data.user));
          }
        } catch (error) {
          // Handle error if needed
          console.error("Login failed:", error);
        }
      },
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/customer/register",
        method: "POST",
        body: userData,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "GET",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          // Clear the profile cache immediately
          dispatch(
            authApi.util.updateQueryData("profile", undefined, () => undefined),
          );

          // Invalidate all user-related tags
          dispatch(authApi.util.invalidateTags(["User"]));

          // Clear tokens
          clearStoredTokens();
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),

    verifyOtp: builder.mutation<ApiResponse<AuthResponse>, VerifyOtpRequest>({
      query: (body) => ({
        url: "/verify-otp-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],

      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data.data.token.original.access_token) {
            storeTokens({
              accessToken: data.data.token.original.access_token,
              rememberMe: true, // You can adjust this based on your logic
            });
            // Optionally, you can dispatch an action to store user info in the state
            // dispatch(setUser(data.user));
          }
        } catch (error) {
          // Handle error if needed
          console.error("Login failed:", error);
        }
      },
    }),

    ownerRegister: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/provider/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileQuery,
  useVerifyOtpMutation,
  useOwnerRegisterMutation,
} = authApi;
