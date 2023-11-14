import { Navigate, createBrowserRouter } from "react-router-dom";

import { LayoutSite, LayoutAdmin } from "./layouts";
import {
  About,
  Checkout,
  Contact,
  Home,
  MyOrder,
  PageNotFound,
  ProductDetailPage,
  ProductsPage,
  OrderDetail,
  UserDetail,
  SigninPage,
  SignupPage,
} from "./pages/client";
import {
  CategoryEdit,
  CategoryList,
  Dashboard,
  ProductAdd,
  ProductEdit,
  ProductList,
} from "./pages/admin";
import { PrivateRoute } from "./helpers/protectionRoute";

const user = JSON.parse(localStorage?.getItem("user") as string);
const isAuth = user?.information?.role == "ADMIN" ? true : false;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutSite />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/contact", element: <Contact /> },
      { path: "/myorder", element: <MyOrder /> },
      { path: "/order/:id", element: <OrderDetail /> },
      { path: "/user", element: <UserDetail /> },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRoute isAuth={isAuth} />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          { index: true, element: <Navigate to="dashboard" /> },
          { path: "dashboard", element: <Dashboard /> },
          {
            path: "products",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <ProductList /> },
              { path: "add", element: <ProductAdd /> },
              { path: ":id/edit", element: <ProductEdit /> },
            ],
          },
          {
            path: "categories",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <CategoryList /> },
              { path: ":id/edit", element: <CategoryEdit /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
