import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../interfaces/product";

const productApi = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, string>({
      query: (params) => `books${params}`,
      providesTags: ["Product"],
    }),
    getProductById: builder.query<
      { message: string; data: IProduct },
      string | number
    >({
      query: (id) => `book/${id}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (payload) => ({
        url: "books",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
    removeProduct: builder.mutation({
      query: (payload) => ({
        url: `books`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (payload) => ({
        url: `books`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
