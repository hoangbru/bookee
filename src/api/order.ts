import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const orderApi = createApi({
    reducerPath: 'orders',
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL_API,
    }),
    endpoints: (builder) => ({
        getAllOrders: builder.query<any, string>({
            query: (params) => `orders${params}`,
            providesTags: ['Order']
        }),
        getOrderById: builder.query<any, string | number>({
            query: (id) => `order/${id}`,
            providesTags: ['Order']
        }),
        addOrder: builder.mutation({
            query: (value) => ({
                url: 'orders',
                method: 'POST',
                body: value
            }),
            invalidatesTags: ['Order']
        }),
        updateOrder: builder.mutation({
            query: (value) => ({
                url: `order/${value.id}`,
                method: 'PATCH',
                body: value
            }),
            invalidatesTags: ['Order']
        })
    })
})

export const {
    useGetAllOrdersQuery,
    useGetOrderByIdQuery,
    useAddOrderMutation,
    useUpdateOrderMutation
} = orderApi
export const orderReducer = orderApi.reducer
export default orderApi