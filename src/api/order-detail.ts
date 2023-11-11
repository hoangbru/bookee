import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const orderDetailApi = createApi({
    reducerPath: 'order-details',
    tagTypes: ['OrderDetail'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL_API,
    }),
    endpoints: (builder) => ({
        getAllOrderDetails: builder.query<any, string>({
            query: (params) => `order-details${params}`,
            providesTags: ['OrderDetail']
        }),
        getOrderDetailById: builder.query<any, string | number>({
            query: (id) => `order-detail/${id}`,
            providesTags: ['OrderDetail']
        }),
        addOrderDetail: builder.mutation({
            query: (value) => ({
                url: 'order-details',
                method: 'POST',
                body: value
            }),
            invalidatesTags: ['OrderDetail']
        }),
        updateOrderDetail: builder.mutation({
            query: (value) => ({
                url: `order-detail/${value.id}`,
                method: 'PATCH',
                body: value
            }),
            invalidatesTags: ['OrderDetail']
        })
    })
})

export const {
    useGetAllOrderDetailsQuery,
    useGetOrderDetailByIdQuery,
    useAddOrderDetailMutation,
    useUpdateOrderDetailMutation
} = orderDetailApi
export const orderDetailReducer = orderDetailApi.reducer
export default orderDetailApi