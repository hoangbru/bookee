import { useEffect, useState, Fragment } from "react";
import { Skeleton } from "antd";
import { FormattedDate, FormattedTime, FormattedNumber } from "react-intl";
import { Menu, Transition } from "@headlessui/react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import NoData from "../../components/NoData";

import { useGetUserByIdQuery } from "../../api/user";
import { useUpdateOrderMutation } from "../../api/order";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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
            <table className="w-full">
              <thead>
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Tên người nhận</th>
                  <th>Ngày đặt</th>
                  <th>Tổng giá</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <Skeleton active />
                ) : (
                  <>
                    {(!orders || orders.length == 0) && <NoData />}
                    {orders?.map((order: any, index: number) => {
                      return (
                        <tr key={index} className="px-2">
                          <td>#{order?.code}</td>
                          <td>{order?.fullName}</td>
                          <td>
                            <FormattedTime value={order?.createdAt} />,{" "}
                            <FormattedDate value={order?.createdAt} />
                          </td>
                          <td>
                            <FormattedNumber
                              value={order.amount!}
                              style="currency"
                              currency="VND"
                            />
                          </td>
                          <td>
                            {(() => {
                              switch (order?.status) {
                                case "-1":
                                  return (
                                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20">
                                      Đã huỷ
                                    </span>
                                  );
                                case "0":
                                  return (
                                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                      Đang chờ xử lý
                                    </span>
                                  );
                                case "1":
                                  return (
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                                      Đã nhận
                                    </span>
                                  );
                                case "2":
                                  return (
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20">
                                      Đang giao
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
                          <td>
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                  <HiEllipsisHorizontal size={25} />
                                </Menu.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to={`/order/${order.id}`}
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          Xem chi tiết
                                        </Link>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={() => cancelOrder(order)}
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          Huỷ đơn hàng
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
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
    </>
  );
}
