import { Link, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../api/order";
import { FormattedNumber, FormattedDate, FormattedTime } from "react-intl";
import { Skeleton } from "antd";

const OrderDetail = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(id || "");
  return (
    <>
      <div className="pt-20 px-4 md:px-10 lg:px-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 pb-5">
          Mã đơn hàng: #{order?.data.code}
        </h1>

        <div className="lg:grid grid-cols-2 gap-6">
          <div className="flex flex-col justify-center items-start border rounded-md my-1 px-4 h-[300px]">
            <div className="py-1">
              <span className="text-base text-black font-medium">
                Tên người nhận:{" "}
              </span>
              <span>{order?.data.fullName}</span>
            </div>
            <div className="py-1">
              <span className="text-base text-black font-medium">Email: </span>
              <span>{order?.data.email}</span>
            </div>
            <div className="py-1">
              <span className="text-base text-black font-medium">
                Số điện thoại người nhận:{" "}
              </span>
              <span>{order?.data.phone}</span>
            </div>
            <div className="py-1">
              <span className="text-base text-black font-medium">
                Địa chỉ giao hàng:{" "}
              </span>
              <span>{order?.data.address}</span>
            </div>
            <div className="py-1">
              <span className="text-base text-black font-medium">
                Đã đặt hàng lúc:{" "}
              </span>
              <span>
                <FormattedTime value={order?.data.createdAt} />,{" "}
                <FormattedDate
                  value={order?.data.createdAt}
                  year="numeric"
                  month="long"
                  day="numeric"
                />
              </span>
            </div>
            <div className="py-1">
              <span className="text-base text-black font-medium">
                Trạng thái:{" "}
              </span>
              <span>
                {(() => {
                  switch (order?.data.status) {
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
              </span>
            </div>
          </div>

          <div className="overflow-y-auto border rounded-md px-4 my-1 h-[300px]">
            <ul role="list" className="divide-gray-100">
              {isLoading ? (
                <Skeleton active />
              ) : (
                <>
                  {order?.data.orderDetails.map((product: any) => (
                    <li
                      key={product.book.id}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <Link
                        to={`/product/${product.book.id}`}
                        className="flex min-w-0 gap-x-4"
                      >
                        <img
                          className="h-20 w-20 flex-none rounded-xl bg-gray-50"
                          src={product.book.image}
                          alt=""
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {product.book.title}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            x{product.quantity}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            <FormattedNumber
                              value={product.book.price}
                              style="currency"
                              currency="VND"
                            />
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
        <p className="text-2xl font-bold tracking-tight text-gray-900 py-6">
          Tổng đơn:{" "}
          {order?.data.amount ? (
            <FormattedNumber
              value={order?.data.amount}
              style="currency"
              currency="VND"
            />
          ) : (
            <FormattedNumber value={0} style="currency" currency="VND" />
          )}
        </p>
      </div>
    </>
  );
};

export default OrderDetail;
