import type { ApiResponse } from "@/types";
import type {
  IService,
  ITimeSlot,
  ServiceParams,
  TimeSlotQuery,
} from "@/types/service";
import { apiSlice } from "./index";

export const serviceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    services: builder.query<ApiResponse<IService[]>, ServiceParams>({
      query: (params) => ({
        url: "/service/getAllServices",
        method: "GET",
        params,
      }),
    }),

    serviceDetails: builder.query<ApiResponse<IService>, { serviceId: number }>(
      {
        query: ({ serviceId }) => ({
          url: `/service_details/${serviceId}`,
          method: "GET",
        }),
      },
    ),

    availableTimeSlots: builder.query<ApiResponse<ITimeSlot[]>, TimeSlotQuery>({
      query: (body) => ({
        url: "/available/service/time-slots",
        method: "POST",
        params: body,
      }),
    }),

    // New endpoint to fetch favorite services
    getFavorites: builder.query<ApiResponse<IService[]>, void>({
      query: () => ({
        url: "/get-favourite",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: "Favorites" as const,
                id,
              })),
              { type: "Favorites", id: "LIST" },
            ]
          : [{ type: "Favorites", id: "LIST" }],
      transformResponse: (response: ApiResponse<IService[]>) => response,
    }),

    addFavorite: builder.mutation<ApiResponse<IService>, Partial<IService>>({
      query: ({ id }) => ({
        url: "/add-favourite",
        method: "POST",
        params: { service_id: id },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Favorites", id },
        { type: "Favorites", id: "LIST" },
      ],
      async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
        // Find service data from any cached services query
        const state = getState();
        let serviceToAdd = null;

        // Search through all possible services cache entries
        const apiState = state.api;
        for (const [queryKey, queryData] of Object.entries(apiState.queries)) {
          if (
            queryKey.startsWith("services(") &&
            queryData &&
            typeof queryData === "object" &&
            "data" in queryData
          ) {
            const cacheData = queryData.data as { data?: IService[] };
            if (cacheData?.data && Array.isArray(cacheData.data)) {
              serviceToAdd = cacheData.data.find(
                (service: IService) => service.id === id,
              );
              if (serviceToAdd) break;
            }
          }
        }

        // Optimistic update
        const patchResult = dispatch(
          serviceApi.util.updateQueryData(
            "getFavorites",
            undefined,
            (draft) => {
              // Check if already in favorites
              const exists = draft.data?.some((service) => service.id === id);

              if (!exists && draft.data && serviceToAdd) {
                draft.data.push(serviceToAdd);
              }
            },
          ),
        );

        try {
          await queryFulfilled;

          // Force refetch to ensure cache is up to date
          dispatch(
            serviceApi.util.invalidateTags([{ type: "Favorites", id: "LIST" }]),
          );
        } catch (error) {
          console.error("❌ Add favorite failed:", error);
          patchResult.undo();
        }
      },
    }),

    removeFavorite: builder.mutation<ApiResponse<IService>, Partial<IService>>({
      query: ({ id }) => ({
        url: `/remove-favourites`,
        method: "POST",
        params: { service_id: id },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Favorites", id },
        { type: "Favorites", id: "LIST" },
      ],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        // Optimistic update - remove from favorites immediately
        const patchResult = dispatch(
          serviceApi.util.updateQueryData(
            "getFavorites",
            undefined,
            (draft) => {
              if (draft.data) {
                const index = draft.data.findIndex(
                  (service) => service.id === id,
                );
                if (index !== -1) {
                  draft.data.splice(index, 1);
                }
              }
            },
          ),
        );

        try {
          await queryFulfilled;

          // Force refetch to ensure cache is up to date
          dispatch(
            serviceApi.util.invalidateTags([{ type: "Favorites", id: "LIST" }]),
          );
        } catch (error) {
          console.error("❌ Remove favorite failed:", error);
          patchResult.undo();
        }
      },
    }),

    addService: builder.mutation<ApiResponse<IService>, FormData>({
      query: (body) => ({
        url: "/service/create",
        method: "POST",
        body,
      }),
    }),

    editService: builder.mutation<ApiResponse<IService>, FormData>({
      query: (body) => ({
        url: "/service/update",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const updatedService = data.data;

          // Update service details cache
          dispatch(
            serviceApi.util.updateQueryData(
              "serviceDetails",
              { serviceId: updatedService.id },
              (draft) => {
                Object.assign(draft.data, updatedService);
              },
            ),
          );

          // Update services list cache
          const state = getState();
          const apiState = state.api;

          // Find and update all services queries
          for (const [queryKey, queryData] of Object.entries(
            apiState.queries,
          )) {
            if (
              queryKey.startsWith("services(") &&
              queryData &&
              typeof queryData === "object" &&
              "data" in queryData
            ) {
              // Extract parameters from query key to update the correct cache
              const match = queryKey.match(/services\((.+)\)/);
              if (match) {
                try {
                  const params = JSON.parse(match[1]);

                  dispatch(
                    serviceApi.util.updateQueryData(
                      "services",
                      params,
                      (draft) => {
                        if (draft.data && Array.isArray(draft.data)) {
                          const index = draft.data.findIndex(
                            (service) => service.id === updatedService.id,
                          );
                          if (index !== -1) {
                            Object.assign(draft.data[index], updatedService);
                          }
                        }
                      },
                    ),
                  );
                } catch (parseError) {
                  console.error("❌ Failed to parse query params:", parseError);
                }
              }
            }
          }

          // Update favorites cache if the service exists there
          dispatch(
            serviceApi.util.updateQueryData(
              "getFavorites",
              undefined,
              (draft) => {
                if (draft.data && Array.isArray(draft.data)) {
                  const index = draft.data.findIndex(
                    (service) => service.id === updatedService.id,
                  );
                  if (index !== -1) {
                    Object.assign(draft.data[index], updatedService);
                  }
                }
              },
            ),
          );
        } catch (error) {
          console.error("❌ Edit service failed:", error);
        }
      },
    }),

    deleteService: builder.mutation<ApiResponse<null>, { serviceId: number }>({
      query: ({ serviceId }) => ({
        url: `/service/remove/${serviceId}`,
        method: "GET",
      }),
      async onQueryStarted(
        { serviceId },
        { dispatch, queryFulfilled, getState },
      ) {
        const state = getState();
        const apiState = state.api;
        const patchResults: Array<{ undo: () => void }> = [];

        try {
          // Optimistic updates - remove from all caches immediately

          // 1. Remove from service details cache
          const serviceDetailsPatch = dispatch(
            serviceApi.util.updateQueryData(
              "serviceDetails",
              { serviceId },
              (draft) => {
                // Clear the service details data
                draft.data = {} as IService;
              },
            ),
          );
          patchResults.push(serviceDetailsPatch);

          // 2. Remove from all services list caches
          for (const [queryKey, queryData] of Object.entries(
            apiState.queries,
          )) {
            if (
              queryKey.startsWith("services(") &&
              queryData &&
              typeof queryData === "object" &&
              "data" in queryData
            ) {
              const match = queryKey.match(/services\((.+)\)/);
              if (match) {
                try {
                  const params = JSON.parse(match[1]);

                  const servicesPatch = dispatch(
                    serviceApi.util.updateQueryData(
                      "services",
                      params,
                      (draft) => {
                        if (draft.data && Array.isArray(draft.data)) {
                          const index = draft.data.findIndex(
                            (service) => service.id === serviceId,
                          );
                          if (index !== -1) {
                            draft.data.splice(index, 1);
                          }
                        }
                      },
                    ),
                  );
                  patchResults.push(servicesPatch);
                } catch (parseError) {
                  console.error("❌ Failed to parse query params:", parseError);
                }
              }
            }
          }

          // 3. Remove from favorites cache
          const favoritesPatch = dispatch(
            serviceApi.util.updateQueryData(
              "getFavorites",
              undefined,
              (draft) => {
                if (draft.data && Array.isArray(draft.data)) {
                  const index = draft.data.findIndex(
                    (service) => service.id === serviceId,
                  );
                  if (index !== -1) {
                    draft.data.splice(index, 1);
                  }
                }
              },
            ),
          );
          patchResults.push(favoritesPatch);

          // Wait for the actual API call
          await queryFulfilled;

          console.log("✅ Service deleted successfully");
        } catch (error) {
          console.error("❌ Delete service failed:", error);

          // Revert all optimistic updates on failure
          patchResults.forEach((patchResult) => {
            patchResult.undo();
          });
        }
      },
    }),
  }),
});

export const {
  useServicesQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useServiceDetailsQuery,
  useAvailableTimeSlotsQuery,
  useAddServiceMutation,
  useEditServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
