import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiUserCircle } from "react-icons/hi2";

import { avatarErr } from "../../helpers/onHandleImageErr";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../api/user";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UserDetail = () => {
  const user = JSON.parse(localStorage?.getItem("user") as string);

  const { data: userById } = useGetUserByIdQuery(user?.information?.userId);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("username", userById?.data.username);
    setValue("fullName", userById?.data.fullName);
    setValue("phone", userById?.data.phone);
    setValue("email", userById?.data.email);
    setValue("address", userById?.data.address);
  }, [setValue, userById]);

  const submitInfo = (value: any) => {
    updateUser({ ...value, id: userById?.data.id })
      .unwrap()
      .then((res: any) => {
        toast.success(res.message);
      })
      .then((res: any) => {
        toast.error(res.data.message);
      });
  };
  return (
    <>
      <div className="p-20">
        <form onSubmit={handleSubmit(submitInfo)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-3xl font-semibold leading-7 text-gray-900">
                Thông tin cá nhân
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tên đăng nhập
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        {...register("username", {
                          required: "Không được bỏ trống",
                        })}
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      {errors.username && (
                        <span className="text-red-500">
                          {errors.username.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-full lg:col-span-2">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ảnh đại diện
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {user ? (
                      <img
                        src={userById?.data.image}
                        alt=""
                        className="w-7 h-7 rounded-full"
                        onError={avatarErr}
                      />
                    ) : (
                      <HiUserCircle
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Thay đổi
                    </button>
                  </div>
                </div>

                {/* <div className="col-span-full">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <HiPhoto
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Tải ảnh lên</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">hoặc kéo và thả</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Họ và tên
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("fullName", {
                        required: "Không được bỏ trống",
                      })}
                      id="name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.fullName && (
                      <span className="text-red-500">
                        {errors.fullName.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("email", {
                        required: "Không được bỏ trống",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Email sai định dạng",
                        },
                      })}
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Số điện thoại
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("phone", {
                        required: "Không được bỏ trống",
                      })}
                      id="phone"
                      autoComplete="phone"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.phone && (
                      <span className="text-red-500">
                        {errors.phone.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Địa chỉ
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("address", {
                        required: "Không được bỏ trống",
                      })}
                      id="address"
                      autoComplete="address"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={20} />
              ) : (
                "Lưu"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserDetail;
