/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiX, HiFilter, HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { HiOutlineEye, HiOutlineShoppingCart } from "react-icons/hi";
import * as CurrencyFormat from "react-currency-format";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import PreviewProduct from "../../components/client/product/PreviewProduct";
import Filters from "../../components/Filters";

import { useGetAllProductsQuery } from "../../api/product";
import { useGetAllCategoriesQuery } from "../../api/category";
import { ICategory } from "../../interfaces/category";
import { AppContext } from "../../context/AppContext";
import NoData from "../../components/NoData";
import { IProduct } from "../../interfaces/product";
import { useAppDispatch } from "../../store/hook";
import { add } from "../../slices/Cart";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const context = useContext(AppContext);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openQuickView, setOpenQuickView] = useState<boolean>(false);
  const [dataQuickView, setDataQuickView] = useState<IProduct>();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: productsApi, isLoading: isLoadingProducts } =
    useGetAllProductsQuery(
      `?page=${currentPage}${
        context?.categoryIdSelected != ""
          ? `&categoryId=${context.categoryIdSelected}`
          : ""
      }`
    );
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<any>({});

  const { data: categories } = useGetAllCategoriesQuery("");

  useEffect(() => {
    setCurrentPage(productsApi?.result.currentPage);
  }, [productsApi?.result.currentPage]);

  useEffect(() => {
    setProductsList(productsApi?.data);
  }, [productsApi?.data]);

  useEffect(() => {
    setProducts(productsApi);
  }, [productsApi]);

  const totalPages = Math.ceil(
    products?.result?.total / products?.result?.itemPerPage
  );

  const pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  const onHandlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onHandlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onHandleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleOpenQuickView = (data: IProduct) => {
    setDataQuickView(data);
    setOpenQuickView(true);
  };

  const handleCloseQuickView = () => {
    setOpenQuickView(false);
  };

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
                      <li className="w-full">
                        <button
                          type="button"
                          className={`flex justify-start group w-full ${
                            context.categoryIdSelected == ""
                              ? "bg-indigo-500 text-white"
                              : ""
                          } rounded-sm opacity-90 block px-2 py-3`}
                          onClick={() => context.handleSetCategoryId("")}
                        >
                          Tất cả danh mục
                        </button>
                      </li>
                      {categories?.data.map((category: ICategory) => (
                        <li key={category.id} className="w-full">
                          <button
                            type="button"
                            className={`flex justify-start group w-full ${
                              context.categoryIdSelected == category.id
                                ? "bg-indigo-500 text-white"
                                : ""
                            } rounded-sm opacity-90 block px-2 py-3`}
                            onClick={() =>
                              context.handleSetCategoryId(category.id)
                            }
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
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
            <div className="flex items-center">
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
              <Filters />

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Pagination */}
                {isLoadingProducts ? (
                  <Skeleton />
                ) : (
                  <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                      <button
                        onClick={onHandlePrevClick}
                        disabled={currentPage == 1}
                        className={`${
                          currentPage == 1
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        } relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
                      >
                        Trước
                      </button>
                      <button
                        onClick={onHandleNextClick}
                        disabled={currentPage == totalPages}
                        className={`${
                          currentPage == totalPages
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        } relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
                      >
                        Sau
                      </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <nav
                          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                          aria-label="Pagination"
                        >
                          <button
                            onClick={onHandlePrevClick}
                            disabled={currentPage == 1}
                            className={`${
                              currentPage == 1
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            } relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                          >
                            <span className="sr-only">Trước</span>
                            <HiArrowSmLeft
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>

                          {pageList?.map((page: number) => {
                            return (
                              <button
                                key={page}
                                onClick={() => onHandlePageChange(page)}
                                className={`${
                                  page == currentPage
                                    ? "border-t-2 border-indigo-600 text-indigo-600"
                                    : "text-gray-600"
                                } relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                              >
                                {page}
                              </button>
                            );
                          })}

                          <button
                            onClick={onHandleNextClick}
                            disabled={currentPage == totalPages}
                            className={`${currentPage == totalPages
                              ? "cursor-not-allowed opacity-50"
                              : ""} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                          >
                            <span className="sr-only">Sau</span>
                            <HiArrowSmRight
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}

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
