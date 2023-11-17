import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const statisticApi = createApi({
  reducerPath: "statistics",
  tagTypes: ["Statistic"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
  }),
  endpoints: (builder) => ({
    getGraphRevenue: builder.query<any, void>({
      query: () => `statistics/graph-revenue`,
      providesTags: ["Statistic"],
    }),
    getTotalRevenue: builder.query<any, void>({
        query: () => `statistics/total-revenue`,
        providesTags: ["Statistic"],
      }),
      getOrderCount: builder.query<any, string>({
        query: (params) => `statistics/order-count${params}`,
        providesTags: ["Statistic"],
      }),
  }),
});

export const { useGetGraphRevenueQuery, useGetTotalRevenueQuery, useGetOrderCountQuery } = statisticApi;
export const statisticReducer = statisticApi.reducer;
export default statisticApi;
