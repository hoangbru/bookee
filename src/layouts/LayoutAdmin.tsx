import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { avatarErr } from "../helpers/onHandleImageErr";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage?.getItem("user") as string);
  const menu = [
    { label: "Bảng điều khiển", url: "/admin/dashboard", active: true },
    { label: "Danh mục", url: "/admin/categories/list", active: false },
    { label: "Sản phẩm", url: "/admin/products/list", active: false },
    { label: "Đơn hàng", url: "/admin/orders/list", active: false },
    { label: "Người dùng", url: "/admin/users/list", active: false },
  ];

  const path = useLocation();

  const btnLogOut = () => {
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Đăng xuất thành công !");
  };

  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            {menu.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.url}
                  className={`text-sm ${
                    path.pathname == item.url
                      ? "text-indigo-500 font-medium"
                      : "text-black"
                  } opacity-font-medium transition-colors hover:opacity-100 text-muted-foreground`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center space-x-4">
              <p className="text-sm text-black opacity-font-medium transition-colors hover:opacity-100 text-muted-foreground">{user?.information?.fullName}</p>
            <div className="w-7 h-7 cursor-pointer">
              <Menu>
                <Menu.Button>
                  <img
                    src={user?.information?.image}
                    alt=""
                    onError={avatarErr}
                    className="object-cover object-center rounded-full"
                  />
                </Menu.Button>
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
                            to={`/`}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Trang chủ
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
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <footer className="bg-white border-t">
        <div className="mx-auto py-10">
          <p className="text-center text-sm text-black">
            &copy; 2023 <span className="text-indigo-400">Bookee</span>, design
            by rechideep
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LayoutAdmin;
