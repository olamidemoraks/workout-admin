import { apiSlice } from "../api/apiSlice";

export const challengeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChallenge: builder.mutation({
      query: ({ data }) => ({
        url: "create-challenge",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllChallenge: builder.query({
      query: () => ({
        url: "get-challenges",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getChallenge: builder.query({
      query: ({ id }) => ({
        url: `get-challenge/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateChallenge: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-challenge/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteChallenge: builder.mutation({
      query: ({ id }) => ({
        url: `delete-challenge/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateChallengeMutation,
  useGetAllChallengeQuery,
  useGetChallengeQuery,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
} = challengeApi;
