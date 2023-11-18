import { FC, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAddReviewMutation } from "../../api/review";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiStar } from "react-icons/hi";

type TModalReview = {
  isOpen: boolean;
  onClose: () => void;
  value: any;
};

const ModalReview: FC<TModalReview> = ({ isOpen, onClose, value }) => {
  const user = JSON.parse(localStorage?.getItem("user") as string);

  const { handleSubmit, register, reset, setValue } = useForm();

  const [addReview, { isLoading }] = useAddReviewMutation();

  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  const handleStarClick = (index: number) => {
    if (selectedStars.includes(index)) {
      setSelectedStars(selectedStars.filter((star) => star !== index));
    } else {
      setSelectedStars([...selectedStars, index]);
    }
  };

  useEffect(() => {
    setValue("username", user?.information.username);
  }, [setValue, user?.information.username]);

  const onHandleConfirm = (review: any) => {
    addReview({
      bookId: value.bookId,
      userId: user?.information.userId,
      comment: review.comment,
      rating: selectedStars.length != 0 ? selectedStars.length : 0,
    })
      .unwrap()
      .then((res: any) => {
        onClose();
        reset();
        window.location.reload();
        toast.success(res.message);
      })
      .catch((res: any) => {
        toast.error(res.data.message);
      });
  };

  return (
    <>
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit(onHandleConfirm)}>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Viết đánh giá của bạn
                      </h3>
                      <div className="my-2 flex gap-1">
                        {[0, 1, 2, 3, 4].map((index: any) => {
                          return (
                            <>
                              <label
                                htmlFor={index}
                                key={index}
                                onClick={() => handleStarClick(index)}
                              >
                                <HiStar
                                  className={`h-5 w-5 flex-shrink-0 ${
                                    selectedStars.includes(index)
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                  aria-hidden="true"
                                />
                              </label>
                              <input
                                id={index}
                                type="checkbox"
                                hidden
                                checked={selectedStars.includes(index)}
                              />
                            </>
                          );
                        })}
                      </div>
                      <div>
                        <label
                          htmlFor="username"
                          className="text-sm text-gray-500"
                        >
                          Tên hiển thị
                        </label>
                        <input
                          type="text"
                          id="username"
                          {...register("username")}
                          className="cursor-not-allowed flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="comment"
                          className="text-sm text-gray-500"
                        >
                          Bình luận
                        </label>
                        <textarea
                          id="comment"
                          rows={10}
                          {...register("comment")}
                          placeholder="Hãy để lại bình luận của bạn..."
                          className="resize-none flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                      {isLoading ? (
                        <AiOutlineLoading3Quarters
                          className="animate-spin"
                          size={20}
                        />
                      ) : (
                        "Gửi"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Huỷ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalReview;
