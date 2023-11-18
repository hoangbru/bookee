import { useParams } from "react-router-dom";
import * as CurrencyFormat from "react-currency-format";

import { toast } from "react-hot-toast";
import { HiStar } from "react-icons/hi";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useAppDispatch } from "../../store/hook";
import { add } from "../../slices/Cart";

import { useGetProductByIdQuery } from "../../api/product";
import { avatarErr } from "../../helpers/onHandleImageErr";
import { FormattedDate, FormattedTime } from "react-intl";

import ModalReview from "../../components/client/ModalReview";
import { useEffect, useState } from "react";
import { IReview } from "../../interfaces/review";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUpdateReviewMutation } from "../../api/review";

// const reviews = { average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(
    id || ""
  );

  const [reviews, setReviews] = useState<any>({ average: 0, totalCount: 0 });

  useEffect(() => {
    const reviewLength = product?.data?.reviews?.length ?? 0;

    const totalRating =
      product?.data?.reviews?.reduce(
        (sum: any, review: any) => sum + parseInt(review.rating),
        0
      ) ?? 0;

    const averageRating = reviewLength !== 0 ? totalRating / reviewLength : 0;

    setReviews({ average: averageRating, totalCount: reviewLength });
  }, [product?.data?.reviews]);

  const [updateReview, { isLoading }] = useUpdateReviewMutation();

  const [comment, setComment] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [reviewUpdateId, setReviewUpdateId] = useState<any>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>();

  const handleOpenUpdate = (id: any) => {
    setReviewUpdateId(id);
    setIsUpdate(true);
  };

  const handleCancelUpdate = () => {
    setReviewUpdateId(undefined);
    setIsUpdate(false);
  };

  const handleOpenModal = () => {
    setModalData({
      bookId: product?.data.id,
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleUpdateReview = (id: any) => {
    updateReview({ id, comment })
      .unwrap()
      .then((res: any) => {
        handleCancelUpdate();
        window.location.reload();
        toast.success(res.message);
      })
      .catch((res: any) => {
        toast.error(res.data.message);
      });
  };

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
                    Năm phát hành: {product?.data?.publishedDate}
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
                  <p className="sr-only">{reviews.average}</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} đánh giá
                  </p>
                </div>
              </div>

              <form className="mt-10">
                <button
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    dispatch(add({ ...product?.data, quantity: 1 }));
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

          {/* review */}
          <div className="mt-4 px-6">
            <div className="flex gap-4">
              <h2 className="py-3 text-xl font-bold tracking-tight text-gray-900">
                Đánh giá
              </h2>
              <button
                onClick={handleOpenModal}
                className="flex justify-center items-center gap-1"
              >
                <span className="text-sm font-normal text-gray-800">
                  Viết đánh giá
                </span>
                <i className="bx bx-pencil"></i>
              </button>
              <ModalReview
                isOpen={openModal}
                onClose={closeModal}
                value={modalData}
              />
            </div>
            <div className="rounded-md border mb-6">
              <div className="w-full overflow-auto min-h-[32px] max-h-[350px] overflow-y-auto">
                <ul className="w-full caption-bottom text-sm">
                  {product?.data?.reviews?.length == 0 && (
                    <li className="text-sm text-gray-600 text-center p-2 leading-8">
                      Chưa có đánh giá nào.
                    </li>
                  )}
                  {product?.data?.reviews?.map((item: IReview) => {
                    return (
                      <li
                        key={item.id}
                        className="grid grid-cols-3 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <div className="col-span-1 p-2 flex justify-start items-center gap-3">
                          <img
                            src={item.user.image}
                            alt=""
                            className="w-8 h-8 rounded-full"
                            onError={avatarErr}
                          />
                          <div>
                            <p className="text-sm text-black font-medium">
                              {item.user.username}
                            </p>
                            <p className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <HiStar
                                  key={rating}
                                  className={classNames(
                                    Number(item.rating) > rating
                                      ? "text-yellow-500"
                                      : "text-gray-300",
                                    "h-3 w-3 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </p>
                            <span>
                              <FormattedTime value={item.createdAt} />,{" "}
                              <FormattedDate value={item.createdAt} />
                            </span>
                          </div>
                        </div>
                        <div className="relative group col-span-2 p-2 flex justify-start items-center gap-3">
                          {!isUpdate &&
                            reviewUpdateId !== item.id &&
                            item.comment}

                          {isUpdate && reviewUpdateId == item.id && (
                            <>
                              <textarea
                                rows={10}
                                defaultValue={item.comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="flex h-20 resize-none w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              ></textarea>
                              <button
                                onClick={() => handleUpdateReview(item.id)}
                                className="absolute bottom-3 right-10 inline-flex w-full justify-center rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                              >
                                {isLoading ? (
                                  <AiOutlineLoading3Quarters
                                    className="animate-spin"
                                    size={20}
                                  />
                                ) : (
                                  "Gửi"
                                )}
                              </button>
                            </>
                          )}
                          {isUpdate && reviewUpdateId == item.id ? (
                            <button
                              className="cursor-pointer"
                              onClick={handleCancelUpdate}
                            >
                              <i className="bx bx-x text-base"></i>
                            </button>
                          ) : (
                            <button
                              className="cursor-pointer"
                              onClick={() => handleOpenUpdate(item.id)}
                            >
                              <i className="bx bx-pencil hidden group-hover:block"></i>
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetailPage;
