import { Link, useParams } from "react-router-dom";

import { Heading } from "../../../components/admin/ui/Heading";
import Separator from "../../../components/admin/ui/Separator";

import { FormattedDate, FormattedNumber, FormattedTime } from "react-intl";
import { Skeleton } from "antd";

import { useGetUserByIdQuery } from "../../../api/user";

const UserShow = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(id || "");
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <Heading title="Thông tin người dùng chi tiết" />
          </div>
        </div>

        <Separator />

        <div>
          <div className="lg:grid grid-cols-2 gap-6">
            <div className="flex flex-col justify-center items-start border rounded-md my-1 px-4 h-[300px]">
              <div className="py-1">
                <span className="text-base text-black font-medium">
                  Tên đăng nhập:{" "}
                </span>
                <span>{user?.data.fullName}</span>
              </div>
              <div className="py-1">
                <span className="text-base text-black font-medium">
                  Email:{" "}
                </span>
                <span>{user?.data.email}</span>
              </div>
              <div className="py-1">
                <span className="text-base text-black font-medium">
                  Số điện thoại:{" "}
                </span>
                <span>{user?.data.phone}</span>
              </div>
              <div className="py-1">
                <span className="text-base text-black font-medium">
                  Địa chỉ:{" "}
                </span>
                <span>{user?.data.address}</span>
              </div>
              <div className="py-1">
                <span className="text-base text-black font-medium">
                  Ngày tạo tài khoản:{" "}
                </span>
                <span>
                  <FormattedTime value={user?.data.createdAt} />,{" "}
                  <FormattedDate
                    value={user?.data.createdAt}
                    year="numeric"
                    month="long"
                    day="numeric"
                  />
                </span>
              </div>
            </div>

            <div className="overflow-y-auto border rounded-md px-4 my-1 h-[300px]">
              <ul role="list" className="divide-gray-100">
                {isLoading ? (
                  <Skeleton active />
                ) : (
                  <>
                    {user?.data.orders.map((order: any) => (
                      <li
                        key={order.id}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <Link
                              to={`/admin/orders/${order.id}/show`}
                              className="text-sm font-semibold leading-6 text-gray-900"
                            >
                              Mã đơn hàng: {order.code}
                            </Link>
                            <p className="text-sm leading-6 text-gray-900">
                              Ngày đặt hàng:{" "}
                              <FormattedTime value={order.createdAt} />,{" "}
                              <FormattedDate
                                value={order.createdAt}
                                year="numeric"
                                month="long"
                                day="numeric"
                              />
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              Tổng tiền hàng:{" "}
                              <FormattedNumber
                                value={order.amount}
                                style="currency"
                                currency="VND"
                              />
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
          <p className="text-2xl font-bold tracking-tight text-gray-900 py-6">
            Tổng đơn:{" "}
            {user?.data.orders?.length ? user?.data.orders?.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserShow;
