import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adminLogin } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: "user-info",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(adminLogin({ user: response.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetUserInfoQuery } = apiSlice;
