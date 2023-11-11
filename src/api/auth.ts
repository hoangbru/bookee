import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (value) => ({
        url: "auth/register",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["Auth"],
    }),
    signIn: builder.mutation({
      query: (value) => ({
        url: "auth/login",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
    useSignUpMutation,
    useSignInMutation
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
