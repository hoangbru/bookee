import {
  useGetGraphRevenueQuery,
  useGetOrderCountQuery,
  useGetTotalRevenueQuery,
} from "../../api/statistic";
import { Heading } from "../../components/admin/ui/Heading";
import Separator from "../../components/admin/ui/Separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/admin/ui/card";

import { CreditCard, DollarSign, Package } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { FormattedNumber } from "react-intl";

const Dashboard = () => {
  const { data: totalRevenue } = useGetTotalRevenueQuery();
  const { data: graphRevenue } = useGetGraphRevenueQuery();
  const { data: orderCount } = useGetOrderCountQuery("");
  const { data: orderDoneCount } = useGetOrderCountQuery("?status=2");
  const { data: orderCancelCount } = useGetOrderCountQuery("?status=-1");
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" />
        <Separator />
        <div
          className="
            grid gap-4 grid-cols-3
            min-[320px]:grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng doanh thu
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <FormattedNumber
                  value={totalRevenue?.data}
                  style="currency"
                  currency="VND"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng đơn hàng
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderCount?.data}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đơn hoàn thành</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderDoneCount?.data}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đơn bị huỷ</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderCancelCount?.data}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Tổng quan</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={graphRevenue?.data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}đ`}
                />
                <Bar dataKey="total" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
