import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FAKE_STORE_URL } from "../../database/api";




export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: FAKE_STORE_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductQuery } = apiSlice;