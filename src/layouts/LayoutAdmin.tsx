import { Link, Outlet, useLocation } from "react-router-dom";

const LayoutAdmin = () => {
  const menu = [
    { label: "Bảng điều khiển", url: "/admin/dashboard", active: true },
    { label: "Danh mục", url: "/admin/categories/list", active: false },
    { label: "Sản phẩm", url: "/admin/products/list", active: false },
    { label: "Đơn hàng", url: "/admin/orders/list", active: false },
    { label: "Người dùng", url: "/admin/users/list", active: false },
  ];

  const path = useLocation();

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
            <div className="w-7 h-7 cursor-pointer">
              <img
                src="https://cdn0.fahasa.com/media/catalog/product/z/4/z4694823431095_74120414b7aabb0f76acac0c865bc61a.jpg"
                alt=""
                className="object-cover object-center rounded-full"
              />
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
