import type {
  ApiResponse,
  BookAppointmentResponse,
  IBookAppointment,
} from "@/types";

import { apiSlice } from "./index";

export const bookAppointmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    bookAppointment: builder.mutation<
      ApiResponse<BookAppointmentResponse>,
      IBookAppointment
    >({
      query: (data) => ({
        url: "/book/service",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useBookAppointmentMutation } = bookAppointmentApi;
