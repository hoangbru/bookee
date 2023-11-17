import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { FormattedDate, FormattedTime, FormattedNumber } from "react-intl";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import NoData from "../../components/NoData";

import { useGetUserByIdQuery } from "../../api/user";
import { useUpdateOrderMutation } from "../../api/order";

export default function MyOrder() {
  const user = JSON.parse(localStorage?.getItem("user") as string);

  const { data: userById, isLoading } = useGetUserByIdQuery(
    user?.information?.userId
  );

  const [orders, setOrders] = useState<any[]>(userById?.data?.orders);

  useEffect(() => {
    setOrders(userById?.data?.orders);
  }, [userById?.data?.orders]);

  const [update] = useUpdateOrderMutation();

  const cancelOrder = (order: any) => {
    const confirm = window.confirm("Bạn có chắc muốn huỷ đơn hàng này ?");
    if (confirm) {
      update({
        id: order.id,
        status: "-1",
      })
        .unwrap()
        .then((res: any) => {
          const updatedData = orders?.map((item: any) => {
            if (item.id == res.data.id) {
              return {
                ...item,
                status: res.data.status,
              };
            }
            return item;
          });

          setOrders(updatedData);
          toast.success(res.message);
        })
        .catch((res: any) => {
          toast.error(res.message);
        });
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Đơn hàng của bạn
          </h2>

          <div className="mt-6">
            <div className="rounded-md border">
              <div className="w-full overflow-auto h-[370px] overflow-y-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Mã đơn hàng
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Người nhận
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Ngày đặt hàng
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Tổng giá
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Trạng thái
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {isLoading ? (
                      <tr className="border-0">
                        <td colSpan={6}>
                          <Skeleton active />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {(!orders || orders.length == 0) && (
                          <tr className="border-0">
                            <td colSpan={6}>
                              <NoData />
                            </td>
                          </tr>
                        )}
                        {orders?.map((item: any) => {
                          return (
                            <tr className="border-0" key={item.id}>
                              <td className="p-4 align-middle">{item.code}</td>
                              <td className="p-4 align-middle">
                                {item.fullName}
                              </td>
                              <td className="p-4 align-middle">
                                <FormattedTime value={item?.createdAt} />,{" "}
                                <FormattedDate value={item?.createdAt} />
                              </td>
                              <td className="p-4 align-middle">
                                <FormattedNumber
                                  value={item.amount!}
                                  style="currency"
                                  currency="VND"
                                />
                              </td>
                              <td className="p-4 align-middle">
                                {(() => {
                                  switch (item?.status) {
                                    case "-1":
                                      return (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20">
                                          Đã huỷ
                                        </span>
                                      );
                                    case "0":
                                      return (
                                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                          Chờ xử lý
                                        </span>
                                      );
                                    case "1":
                                      return (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                                          Đang giao
                                        </span>
                                      );
                                    case "2":
                                      return (
                                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20">
                                          Đã giao
                                        </span>
                                      );
                                    default:
                                      return (
                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-600/20">
                                          Đang tải
                                        </span>
                                      );
                                  }
                                })()}
                              </td>

                              <td className="p-4 align-middle">
                                <Link
                                  to={`/order/${item.id}`}
                                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 p-2 h-8 w-8"
                                >
                                  <i className="bx bx-info-circle text-base"></i>
                                </Link>
                                <button
                                  onClick={() => cancelOrder(item)}
                                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 p-2 h-8 w-8"
                                >
                                  <i className="bx bx-edit text-base"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
