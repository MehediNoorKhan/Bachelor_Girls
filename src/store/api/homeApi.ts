import type { ApiResponse, ICategory, IHome, ITopProvider } from "@/types";
import { apiSlice } from "./index";
export const homeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    home: builder.query<ApiResponse<IHome>, void>({
      query: () => ({
        url: "/banner-info",
        method: "GET",
      }),
    }),

    categories: builder.query<ApiResponse<ICategory[]>, void>({
      query: () => ({
        url: "/category/get",
        method: "GET",
      }),
    }),

    topRatedProviders: builder.query<ApiResponse<ITopProvider[]>, void>({
      query: () => ({
        url: "/topProvider/get",
        method: "GET",
      }),
    }),
  }),
});

export const { useHomeQuery, useCategoriesQuery, useTopRatedProvidersQuery } =
  homeApi;
