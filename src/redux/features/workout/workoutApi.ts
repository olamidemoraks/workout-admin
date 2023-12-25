import { apiSlice } from "../api/apiSlice";

export const workoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWorkout: builder.mutation({
      query: (values) => ({
        url: "create-workout",
        method: "POST",
        credentials: "include" as const,
        body: values,
      }),
    }),
    editWorkout: builder.mutation({
      query: ({ values, id }) => ({
        url: `update-workout/${id}`,
        method: "PUT",
        credentials: "include" as const,
        body: values,
      }),
    }),
    getAllWorkout: builder.query({
      query: () => ({
        url: "get-all-workouts",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getWorkout: builder.query({
      query: ({ id }) => ({
        url: `get-workout/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteWorkout: builder.mutation({
      query: ({ id }) => ({
        url: `delete-workout/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateWorkoutMutation,
  useGetWorkoutQuery,
  useEditWorkoutMutation,
  useGetAllWorkoutQuery,
  useDeleteWorkoutMutation,
} = workoutApi;
