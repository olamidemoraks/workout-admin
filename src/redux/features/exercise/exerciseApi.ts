import { apiSlice } from "../api/apiSlice";

export const exerciseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createExercise: builder.mutation({
      query: (value) => ({
        url: "create-exercise",
        method: "POST",
        body: value,
        credentials: "include" as const,
      }),
    }),

    editExercise: builder.mutation({
      query: ({ value, id }) => ({
        url: `update-exercise/${id}`,
        method: "PUT",
        body: { ...value },
        credentials: "include" as const,
      }),
    }),
    deleteExercise: builder.mutation({
      query: (id) => ({
        url: `delete-exercise/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getExercises: builder.query({
      query: () => ({
        url: "get-exercises",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getExercise: builder.query({
      query: ({ id }) => ({
        url: `get-exercise/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateExerciseMutation,
  useGetExercisesQuery,
  useGetExerciseQuery,
  useEditExerciseMutation,
  useDeleteExerciseMutation,
} = exerciseApi;
