import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "../../store/hook";

import { remove, clear } from "../../slices/Cart";
import { useGetUserByIdQuery } from "../../api/user";
import { useAddOrderMutation } from "../../api/order";
import { useAddOrderDetailMutation } from "../../api/order-detail";
import { FormattedNumber } from "react-intl";

export default function Checkout() {
  const user = JSON.parse(localStorage?.getItem("user") as string);

  const { data: userById } = useGetUserByIdQuery(user?.information?.userId);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const [addOrder, { isLoading: isLoadingOrder }] = useAddOrderMutation();
  const [addOrderDetail, { isLoading: isLoadingOrderDetail }] =
    useAddOrderDetailMutation();

  const { items: carts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const total = carts.reduce((sum: any, item: any) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (carts.length == 0) {
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }

  const useInfoExist = () => {
    setValue("fullName", userById?.data.fullName);
    setValue("email", userById?.data.email);
    setValue("phone", userById?.data.phone);
    setValue("address", userById?.data.address);
  };

  const onHandleSubmit = (value: any) => {
    addOrder({ ...value, userId: user?.information.userId, amount: total })
      .unwrap()
      .then((response: any) => {
        if (carts.length > 0) {
          const orderItems = carts.map((item: any) => ({
            orderId: response.data.id,
            bookId: item.id,
            quantity: item.quantity,
          }));
          addOrderDetail(orderItems)
            .unwrap()
            .then(() => {
              dispatch(clear());
              toast.success(response.message);
            })
            .catch((res) => {
              toast.error(res.data.message);
            });
        }
      })
      .catch((response: any) => {
        toast.error(response.data.message);
      });
  };

  return (
    <>
      <div className="bg-white pb-24">
        <div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Thanh toán đơn hàng
              </h1>
            </div>

            <div className="flex justify-between gap-3 items-center py-5">
              <form
                onSubmit={handleSubmit(onHandleSubmit)}
                className="
                grid 
                grid-cols-2 
                gap-4 
                md:grid-cols-2
                sm:grid-cols-1
                min-[320px]:grid-cols-1
              "
              >
                <div className="flex flex-col gap-2 pb-2">
                  <div className="space-y-12">
                    <div>
                      <h2 className="text-lg font-semibold leading-7 text-gray-900">
                        Thông tin giao hàng
                      </h2>
                      <div className="mt-2 flex items-center gap-1">
                        <p className="text-sm text-gray-500 font-normal">
                          Sử dụng thông tin tài khoản đăng nhập?
                        </p>
                        <button type="button" onClick={useInfoExist}>
                          <TiTickOutline size={23} className="text-green-500" />
                        </button>
                      </div>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Họ và tên
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              id="name"
                              {...register("fullName", {
                                required: "Không được bỏ trống",
                              })}
                              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.fullName && (
                              <span className="text-red-500">
                                {errors.fullName.message as React.ReactNode}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "Không được bỏ trống",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: "Email sai định dạng",
                                },
                              })}
                              type="text"
                              autoComplete="email"
                              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                            {errors.email && (
                              <span className="text-red-500">
                                {errors.email.message as React.ReactNode}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Số điện thoại
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              type="phone"
                              {...register("phone", {
                                required: "Không được bỏ trống",
                              })}
                              autoComplete="phone"
                              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.phone && (
                              <span className="text-red-500">
                                {errors.phone.message as React.ReactNode}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Địa chỉ
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("address", {
                                required: "Không được bỏ trống",
                              })}
                              id="street-address"
                              autoComplete="street-address"
                              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.address && (
                              <span className="text-red-500">
                                {errors.address.message as React.ReactNode}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 rounded-lg px-4 pt-2 pb-2 border border-gray-300">
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-lg font-semibold leading-7 text-gray-900">
                        Đơn hàng
                      </h2>

                      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full w-[588px] overflow-y-auto min-h-[200px] max-h-[300px]">
                          {carts.length === 0 ? (
                            <div className="text-sm text-gray-500 font-medium">
                              Đơn hàng trống...
                            </div>
                          ) : (
                            <>
                              {carts?.map((item: any, index: number) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex gap-3 mt-2 py-4 w-full items-center"
                                  >
                                    <Link to={`/product/${item.id}`}>
                                      <img
                                        src={item?.image}
                                        alt="image of product"
                                        className="object-cover rounded-md w-16 h-16"
                                      />
                                    </Link>
                                    <div className="relative">
                                      <p className="text-base font-medium sm:truncate">
                                        <Link to={`/product/${item.id}`}>
                                          {item?.title}
                                        </Link>
                                      </p>

                                      <p className="flex text-sm py-1">
                                        <FormattedNumber
                                          value={item?.price}
                                          style="currency"
                                          currency="VND"
                                        />
                                      </p>
                                      <p className="flex text-sm py-1 text-gray-700">
                                        x {item.quantity}
                                      </p>
                                      <div className="absolute bottom-0 left-8">
                                        <button
                                          type="button"
                                          className="
                                        hover:opacity-75
                                        "
                                          onClick={() =>
                                            dispatch(remove(item.id))
                                          }
                                        >
                                          <HiOutlineTrash size={20} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between border-b border-gray-900/10 py-4">
                    <p className="text-base font-semibold">Total:</p>
                    <p>
                      <FormattedNumber
                        value={total}
                        style="currency"
                        currency="VND"
                      />
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="submit"
                      className="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {isLoadingOrder || isLoadingOrderDetail ? (
                        <AiOutlineLoading3Quarters
                          className="animate-spin"
                          size={20}
                        />
                      ) : (
                        "Hoàn tất đặt hàng"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
