import config from "@/config";
import { getStoredTokens } from "@/lib/tokenStorage";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { BaseQueryApi } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Enhanced error handler for server responses
export const extractErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "data" in error) {
    const errorData = (error as { data?: unknown }).data;
    if (errorData && typeof errorData === "object" && "message" in errorData) {
      const errorObj = errorData as Record<string, unknown>;
      if (typeof errorObj.message === "string") {
        return errorObj.message;
      }
    }
    if (errorData && typeof errorData === "object") {
      const errorObj = errorData as Record<string, unknown>;
      if ("error" in errorObj && typeof errorObj.error === "string") {
        return errorObj.error;
      }
      if ("errors" in errorObj && Array.isArray(errorObj.errors)) {
        return errorObj.errors.length > 0
          ? String(errorObj.errors[0])
          : "An error occurred";
      }
    }
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  prepareHeaders: (headers) => {
    const storedTokens = getStoredTokens();
    if (storedTokens?.accessToken) {
      headers.set("Authorization", `Bearer ${storedTokens.accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api: BaseQueryApi, extraOptions: Record<string, unknown>) => {
  const result = await baseQuery(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   window.location.replace("/");
  // }

  if (result.error) {
    const errorData = result.error.data as Record<string, unknown> | undefined;
    if (errorData && typeof errorData === "object") {
      (errorData as Record<string, unknown>).userMessage = extractErrorMessage(
        result.error,
      );
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Notifications",
    "ownerReviews",
    "Favorites",
    "Conversations",
    "Messages",
    "Services",
    "DueList",
    "RequestDueList",
  ],
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
