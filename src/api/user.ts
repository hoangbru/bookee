import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "users",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, string>({
      query: (params) => `users${params}`,
      providesTags: ["User"],
    }),
    getUserById: builder.query<any, string | number>({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),
    removeUser: builder.mutation({
      query: (payload) => ({
        url: `user/${payload.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `user/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = userApi;
export const userReducer = userApi.reducer;
export default userApi;
