import { Fragment, useState } from "react";
import { Dialog, Popover, Transition, Menu } from "@headlessui/react";
import {
  HiOutlineShoppingBag,
  HiMenuAlt1,
  // HiOutlineSearch,
  HiX,
  HiPlusSm,
  HiMinusSm,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { decrease, increase, remove } from "../slices/Cart";
import { toast } from "react-hot-toast";
import { avatarErr } from "../helpers/onHandleImageErr";
import { FormattedNumber } from "react-intl";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = {
  pages: [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Sản phẩm", href: "/products" },
    { name: "Liên hệ", href: "/contact" },
  ],
};

export default function Header() {
  const user = JSON.parse(localStorage?.getItem("user") as string);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useAppDispatch();
  const { items: carts } = useAppSelector((state) => state.cart);
  const total = carts.reduce((sum: any, item: any) => {
    return sum + item.price * item.quantity;
  }, 0);

  const countCart = carts.length;

  const btnLogOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
    toast.success("Đăng xuất thành công !");
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Đóng</span>
                    <HiX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        to={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}

                  {user ? (
                    <>
                      <div className="flow-root">
                        <Link
                          to={`/user/${user?.information?.userId}`}
                          className="flex gap-2 items-center hover:opacity-80 cursor-pointer"
                        >
                          <img
                            src={user?.information?.image}
                            className="w-7 h-7 rounded-full"
                            alt=""
                            onError={avatarErr}
                          />
                          <span>{user?.information?.username}</span>
                        </Link>
                      </div>
                      <div className="flow-root pl-6">
                        <Link
                          to="/user"
                          className="-m-2 block text-sm text-gray-900"
                        >
                          Thông tin tài khoản
                        </Link>
                      </div>
                      {user?.information?.role == "ADMIN" ? (
                        <div className="flow-root pl-6">
                          <Link
                            to="/admin"
                            className="-m-2 block text-sm text-gray-900"
                          >
                            Trang quản trị
                          </Link>
                        </div>
                      ) : (
                        <div className="flow-root pl-6">
                          <Link
                            to="/myorder"
                            className="-m-2 block text-sm text-gray-900"
                          >
                            Đơn hàng của tôi
                          </Link>
                        </div>
                      )}
                      <div className="flow-root">
                        <button
                          onClick={btnLogOut}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6 border-t border-gray-200 pt-4">
                      <div className="flow-root">
                        <Link
                          to="/signin"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Đăng nhập
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/signup"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Tạo tài khoản
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://i.pinimg.com/564x/2a/cb/7d/2acb7d9371550e4f145d5a1a841a41cb.jpg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      VI
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="fixed top-0 left-0 right-0 border-b border-gray-200 bg-slate-50 z-50 w-full px-4 sm:px-6 lg:px-8"
        >
          <div>
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <HiMenuAlt1 className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src="/images/logo.png" alt="" />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <Menu as="div" className="relative ml-3">
                  {/* Signin */}
                  {user ? (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <div className="flex gap-2 items-center cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800">
                        <p className="text-sm">{user?.information?.username}</p>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <img
                            className="h-6 w-6 rounded-full"
                            src={user?.information?.image}
                            alt=""
                            onError={avatarErr}
                          />
                        </Menu.Button>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link
                        to="/signin"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Đăng nhập
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link
                        to="/signup"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Tạo tài khoản
                      </Link>
                    </div>
                  )}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user?.information?.role == "ADMIN" && (
                        <Menu.Item>
                          {({ active }: any) => (
                            <Link
                              to={`/admin`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Trang quản trị
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {user && (
                        <Menu.Item>
                          {({ active }: any) => (
                            <Link
                              to={`/user`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Thông tin tài khoản
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {user?.information?.role == "USER" && (
                        <Menu.Item>
                          {({ active }: any) => (
                            <Link
                              to="/myorder"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Theo dõi đơn hàng
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }: any) => (
                          <Menu.Button
                            onClick={btnLogOut}
                            className={classNames(
                              active ? "bg-gray-100 w-full" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Đăng xuất
                          </Menu.Button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Languages */}
                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      src="https://i.pinimg.com/564x/2a/cb/7d/2acb7d9371550e4f145d5a1a841a41cb.jpg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">VI</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                {/* <span className="flex lg:ml-6 justify-center items-center">
                  <Popover className="relative">
                    <Popover.Button className="flex justify-center items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                      <div className="p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Tìm kiếm</span>
                        <HiOutlineSearch
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </div>
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 z-10 px-4">
                        <div className="w-[300px] flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                          <div className="p-3">
                            <input
                              id="search"
                              type="text"
                              autoComplete="search"
                              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </span> */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    className="group -m-2 flex items-center p-2"
                    onClick={() => setOpenCart(true)}
                  >
                    <HiOutlineShoppingBag
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-indigo-600 group-hover:text-gray-800">
                      {countCart}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Shopping cart mini */}
      <Transition.Root show={openCart} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenCart}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Giỏ hàng của bạn
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpenCart(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Đóng panel</span>
                              <HiX className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {carts.length == 0 ? (
                                <div className="text-gray-400 py-2 text-sm">
                                  Không có sản phẩm nào trong giỏ hàng...
                                </div>
                              ) : (
                                <>
                                  {carts.map((product: any, index: any) => {
                                    return (
                                      <li key={index} className="flex py-6">
                                        <Link
                                          to={`/product/${product.id}`}
                                          onClick={() => setOpenCart(false)}
                                          className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                                        >
                                          <img
                                            src={product.image}
                                            alt="image of product"
                                            className="h-full w-full object-cover object-center"
                                          />
                                        </Link>

                                        <div className="ml-4 flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                              <h3>
                                                <Link
                                                  to={`/product/${product.id}`}
                                                  onClick={() =>
                                                    setOpenCart(false)
                                                  }
                                                  className="capitalize"
                                                >
                                                  {product.title}
                                                </Link>
                                              </h3>
                                              <p className="ml-4">
                                                <FormattedNumber
                                                  value={
                                                    product.price *
                                                    product.quantity
                                                  }
                                                  style="currency"
                                                  currency="VND"
                                                />
                                              </p>
                                            </div>
                                            <p className="flex gap-2 items-center text-sm text-gray-500">
                                              <button
                                                className="border-2 border-gray-500 rounded-md hover:opacity-70"
                                                onClick={() =>
                                                  dispatch(decrease(product.id))
                                                }
                                              >
                                                <HiMinusSm size={20} />
                                              </button>
                                              <button
                                                className="border-2 border-gray-500 rounded-md hover:opacity-70"
                                                onClick={() =>
                                                  dispatch(increase(product.id))
                                                }
                                              >
                                                <HiPlusSm size={20} />
                                              </button>
                                            </p>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                              Số lượng: {product.quantity}
                                            </p>

                                            <div className="flex">
                                              <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() =>
                                                  dispatch(remove(product.id))
                                                }
                                              >
                                                Xoá
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {countCart == 0 ? (
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div>
                            <Link
                              to="/products"
                              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              <button
                                type="button"
                                onClick={() => setOpenCart(false)}
                              >
                                Tiếp tục mua hàng
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <>
                          {user ? (
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Tổng giá</p>
                                <p>
                                  <FormattedNumber
                                    value={total}
                                    style="currency"
                                    currency="VND"
                                  />
                                </p>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                Phí vận chuyển và thuế được tính khi thanh toán.
                              </p>
                              <div className="mt-6">
                                <Link
                                  to="/checkout"
                                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                  <button
                                    type="button"
                                    onClick={() => setOpenCart(false)}
                                  >
                                    Thanh toán
                                  </button>
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                              <div>
                                <Link
                                  to="/signin"
                                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                  <button
                                    type="button"
                                    onClick={() => setOpenCart(false)}
                                  >
                                    Đăng nhập để tiếp tục đặt hàng
                                    <span aria-hidden="true"> &rarr;</span>
                                  </button>
                                </Link>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
