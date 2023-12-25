import { apiSlice } from "../api/apiSlice";
import { adminLogin, adminVerification } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVerificationCode: builder.mutation({
      query: ({ email }) => ({
        url: "admin-activation-code",
        body: {
          email,
        },
        credentials: "include" as const,
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            adminVerification({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    siginAdmin: builder.mutation({
      query: ({ activation_code, activation_token }) => ({
        url: "signin-admin",
        method: "POST",
        body: {
          activation_code,
          activation_token,
        },
        credentials: "include" as const,
      }),

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            adminLogin({
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    logoutUser: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          dispatch(adminLogin({ user: {} }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetVerificationCodeMutation,
  useSiginAdminMutation,
  useLogoutUserQuery,
} = authApi;
