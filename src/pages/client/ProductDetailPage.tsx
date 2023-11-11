import { useParams } from "react-router-dom";
import * as CurrencyFormat from "react-currency-format";

import { toast } from "react-hot-toast";
import { HiStar } from "react-icons/hi";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useAppDispatch } from "../../store/hook";
import { add } from "../../slices/Cart";

import { useGetProductByIdQuery } from "../../api/product";
import { FormattedDate } from "react-intl";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(
    id || ""
  );

  return (
    <>
      <div className="bg-white">
        <div className="pt-6">
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {isLoadingProduct ? <Skeleton /> : product?.data?.title}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Thông tin sách</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {isLoadingProduct ? (
                  <Skeleton />
                ) : (
                  <CurrencyFormat
                    value={product?.data?.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                )}
              </p>

              <div className="mt-5">
                <h2 className="text-base font-medium text-gray-900">
                  Thông tin chi tiết
                </h2>

                <div className="mt-4">
                  <p className="text-sm text-gray-700 font-normal">
                    Tác giả:{" "}
                    <span className="text-sm text-indigo-400">
                      {product?.data.author}
                    </span>
                  </p>
                </div>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-700 font-normal">
                    Ngày phát hành:{" "}
                    <FormattedDate
                      year="numeric"
                      month="long"
                      day="2-digit"
                      value={product?.data?.publishedDate}
                    />
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <h3 className="text-sm text-gray-700 font-normal">
                    Giới thiệu:
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product?.data?.description}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Đánh giá</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <HiStar
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">
                    {reviews.average} 5 sao của chúng tôi
                  </p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} đánh giá
                  </a>
                </div>
              </div>

              <form className="mt-10">
                <button
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    dispatch(add({ ...product, quantity: 1 }));
                    toast.success("Thêm vào giỏ hàng thành công");
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
              </form>
            </div>

            <div className="py-5 lg:col-span-1 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-md">
                {isLoadingProduct ? (
                  <Skeleton width={450} height={350} />
                ) : (
                  <img
                    src={product?.data?.image}
                    alt="image of product"
                    className="rounded-md w-full h-full object-cover object-center"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetailPage;
