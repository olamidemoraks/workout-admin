import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "create-category",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-category/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCategory: builder.query({
      query: () => ({
        url: "get-all-category",
        method: "GET",
      }),
    }),
    getCategory: builder.query({
      query: ({ id }) => ({
        url: `get-category/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `delete-category/${id}`,
        method: "Delete",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetAllCategoryQuery,
  useGetCategoryQuery,
} = categoryApi;
