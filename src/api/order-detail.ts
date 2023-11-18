import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const orderDetailApi = createApi({
    reducerPath: 'order-details',
    tagTypes: ['OrderDetail'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL_API,
    }),
    endpoints: (builder) => ({
        addOrderDetail: builder.mutation({
            query: (value) => ({
                url: 'order-details',
                method: 'POST',
                body: value
            }),
            invalidatesTags: ['OrderDetail']
        }),
    })
})

export const {
    useAddOrderDetailMutation,
} = orderDetailApi
export const orderDetailReducer = orderDetailApi.reducer
export default orderDetailApi