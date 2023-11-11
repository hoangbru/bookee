import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const categoryApi = createApi({
    reducerPath: 'categories',
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL_API,
    }),
    endpoints: (builder) => ({
        getAllCategories: builder.query<any, string>({
            query: (params) => `categories${params}`,
            providesTags: ['Category']
        }),
        getCategoryById: builder.query<any, string | number>({
            query: (id) => `category/${id}`,
            providesTags: ['Category']
        }),
        addCategory: builder.mutation({
            query: (payload) => ({
                url: 'categories',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Category']
        }),
        removeCategory: builder.mutation({
            query: (payload) => ({
                url: `category/${payload.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation({
            query: (payload) => ({
                url: `category/${payload.id}`,
                method: 'PATCH',
                body: payload
            }),
            invalidatesTags: ['Category']
        })
    })
})

export const {
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useRemoveCategoryMutation,
    useUpdateCategoryMutation
} = categoryApi
export const categoryReducer = categoryApi.reducer
export default categoryApi