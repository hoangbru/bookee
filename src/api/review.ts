import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const reviewApi = createApi({
    reducerPath: 'reviews',
    tagTypes: ['Review'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL_API,
    }),
    endpoints: (builder) => ({
        addReview: builder.mutation({
            query: (payload) => ({
                url: 'reviews',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Review']
        }),
        updateReview: builder.mutation({
            query: (payload) => ({
                url: 'reviews',
                method: 'PATCH',
                body: payload
            }),
            invalidatesTags: ['Review']
        })
    })
})

export const {
    useAddReviewMutation,
    useUpdateReviewMutation
} = reviewApi
export const reviewReducer = reviewApi.reducer
export default reviewApi