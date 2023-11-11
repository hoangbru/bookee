/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { HiX, HiMinus, HiPlus, HiChevronDown, HiFilter } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { HiOutlineEye, HiOutlineShoppingCart } from "react-icons/hi";
import * as CurrencyFormat from "react-currency-format";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import PreviewProduct from "../../components/client/product/PreviewProduct";
// import Pagination from "../../components/client/product/Pagination";
import Filters from "../../components/Filters";

import { useGetAllProductsQuery } from "../../api/product";
import { useGetAllCategoriesQuery } from "../../api/category";
import { ICategory } from "../../interfaces/category";
import { AppContext } from "../../context/AppContext";
import NoData from "../../components/NoData";
import { IProduct } from "../../interfaces/product";
import { useAppDispatch } from "../../store/hook";
import { add } from "../../slices/Cart";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const productContext = useContext(AppContext);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openQuickView, setOpenQuickView] = useState<boolean>(false);
  const [dataQuickView, setDataQuickView] = useState<IProduct>();
  const { data: productsApi, isLoading: isLoadingProducts } =
    useGetAllProductsQuery("");
    const [productsList, setProductsList] = useState<IProduct[]>([])

  const { data: categories } = useGetAllCategoriesQuery("");

  const handleOpenQuickView = (data: IProduct) => {
    setDataQuickView(data);
    setOpenQuickView(true);
  };

  const handleCloseQuickView = () => {
    setOpenQuickView(false);
  };

  useEffect(() => {
    setProductsList(productsApi?.data)
  },[productsApi?.data])

  // Filters

  const filters = [
    {
      id: "price",
      name: "Giá",
      options: [
        { value: "100000", label: "100000", checked: false },
        { value: "150000", label: "150000", checked: false },
        { value: "200000", label: "200000", checked: true },
        { value: "250000", label: "250000", checked: false },
        { value: "300000", label: "300000", checked: false },
        { value: "350000", label: "350000", checked: false },
      ],
    },
    // {
    //   id: "size",
    //   name: "Kích cỡ",
    //   options: sizes?.map((item: any) => {
    //     return {
    //       value: item._id,
    //       label: item.size,
    //       checked: false,
    //     };
    //   }),
    // },
  ];

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Lọc</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Đóng</span>
                      <HiX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 ">
                    <h3 className="sr-only">Danh mục</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {categories?.data.map((category: ICategory) => (
                        <li key={category.id} className="w-full">
                          <button
                            type="button"
                            className={`flex justify-start group w-full ${
                              productContext.categorySelected.id == category.id
                                ? "bg-indigo-500 text-white"
                                : ""
                            } rounded-sm opacity-90 block px-2 py-3`}
                            onClick={() =>
                              productContext.setCategorySelected(category)
                            }
                          >
                            <label
                              htmlFor={category.name}
                              className="group-hover:cursor-pointer"
                            >
                              {category.name}
                            </label>
                            <input
                              type="checkbox"
                              id={category.name}
                              defaultValue={category.id}
                              hidden
                            />
                          </button>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <HiMinus
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <HiPlus
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section?.options?.map(
                                  (option: any, optionIdx: any) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  )
                                )}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Mọi người đều mua
            </h1>
            {/* Sort */}
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sắp xếp
                    <HiChevronDown
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Lọc</span>
                <HiFilter className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Sản phẩm
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <Filters filters={filters} />

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Pagination */}
                {/* {isLoadingProducts ? (
                  <Skeleton />
                ) : (
                  <Pagination pagination={products.pagination}/>
                )} */}

                {/* Loading */}
                {isLoadingProducts ? (
                  <div className="flex gap-6 items-center pt-5">
                    <div>
                      <Skeleton width={280} height={320} />
                      <Skeleton width={280} />
                    </div>
                    <div>
                      <Skeleton width={280} height={320} />
                      <Skeleton width={280} />
                    </div>
                    <div>
                      <Skeleton width={280} height={320} />
                      <Skeleton width={280} />
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:gap-x-8">
                    {(!productsList || productsList.length == 0) && (
                      <div className="col-span-full">
                        <NoData />
                      </div>
                    )}
                    {productsList?.map((product: any) => (
                      <div key={product.id}>
                        <div className="group relative">
                          <Link
                            to={`/product/${product.id}`}
                            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                          >
                            <img
                              src={product.image}
                              alt="image of product"
                              className="h-[200px] sm:h-[220px] md:h-[220px] lg:h-[400px] w-full object-cover object-center lg:w-full"
                            />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleOpenQuickView(product)}
                            className="absolute bottom-14 left-4 drop-shadow-md flex justify-center items-center"
                          >
                            <HiOutlineEye
                              size={32}
                              className="opacity-0 text-gray-100 transition ease-linear group-hover:opacity-100 bg-indigo-500 rounded-full p-2"
                            />
                          </button>
                          <button
                            className="absolute bottom-4 left-4 drop-shadow-md flex justify-center items-center"
                            onClick={() => {
                              dispatch(add({ ...product, quantity: 1 }));
                              toast.success("Thêm vào giỏ hàng thành công");
                            }}
                          >
                            <HiOutlineShoppingCart
                              size={32}
                              className="opacity-0 text-gray-100 transition ease-linear group-hover:opacity-100 bg-indigo-500 rounded-full p-2"
                            />
                          </button>
                        </div>
                        <div className="group relative">
                          <div className="mt-4 flex justify-between">
                            <div>
                              <h3 className="text-sm text-gray-700">
                                <Link to={`/product/${product.id}`}>
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0 capitalize"
                                  />
                                  {product.title}
                                </Link>
                              </h3>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              <CurrencyFormat
                                value={product?.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" VND"}
                              />
                            </p>
                          </div>
                        </div>

                        {/* Quick view */}
                        <PreviewProduct
                          isOpen={openQuickView}
                          onClose={handleCloseQuickView}
                          product={dataQuickView}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
