/* eslint-disable no-case-declarations */
import { useRemoveProductMutation } from "../../api/product";
import { useRemoveCategoryMutation } from "../../api/category";
import { useRemoveUserMutation } from "../../api/user";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUpdateOrderMutation } from "../../api/order";

type TModalConfirm = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  type: string;
  value: any;
};

export default function ModalConfirm({
  isOpen,
  onClose,
  title,
  value,
  type,
}: TModalConfirm) {
  const content = "sẽ bị xoá, bạn có chắc chắn?";
  const [deleteCategory, { isLoading: isLoadingCategory }] =
    useRemoveCategoryMutation();
  const [deleteProduct, { isLoading: isLoadingProduct }] =
    useRemoveProductMutation();
  const [deleteUser, { isLoading: isLoadingUser }] = useRemoveUserMutation();
  const [updateOrder, { isLoading: isLoadingOrder }] = useUpdateOrderMutation();

  const onHandleConfirm = () => {
    switch (type) {
      case "category":
        deleteCategory(value)
          .unwrap()
          .then((res: any) => {
            onClose();
            toast.success(res.message);
          })
          .catch((res: any) => {
            toast.error(res.data.message);
          });
        break;
      case "product":
        deleteProduct(value)
          .unwrap()
          .then((res: any) => {
            onClose();
            toast.success(res.message);
          })
          .catch((res: any) => {
            toast.error(res.data.message);
          });
        break;
      case "user":
        deleteUser(value)
          .unwrap()
          .then((res: any) => {
            onClose();
            toast.success(res.message);
          })
          .catch((res: any) => {
            toast.error(res.data.message);
          });
        break;
      case "order":
        updateOrder(value)
          .unwrap()
          .then((res: any) => {
            onClose();
            toast.success(res.message);
          })
          .catch((res: any) => {
            toast.error(res.data.message);
          });
        break;

      default:
        break;
    }
  };

  return (
    <>
      {isOpen && (
        <div
          id={`${value.id}`}
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        {title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {(() => {
                            switch (type) {
                              case "category":
                                return `${value.name} ${content}`;
                              case "product":
                                return `${value.title} ${content}`;
                              case "user":
                                return `${value.username} ${content}`;
                              case "order":
                                const status =
                                  value.status == "-1"
                                    ? "huỷ"
                                    : value.status == "0"
                                    ? "chờ xác nhận"
                                    : value.status == "1"
                                    ? "đang giao"
                                    : "đã giao";
                                return `Đơn ${value.code} sẽ chuyển sang ${status}, bạn có chắc chắn?`;
                              default:
                                break;
                            }
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={onHandleConfirm}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    {isLoadingCategory ||
                    isLoadingProduct ||
                    isLoadingUser ||
                    isLoadingOrder ? (
                      <AiOutlineLoading3Quarters
                        className="animate-spin"
                        size={20}
                      />
                    ) : (
                      "Xác nhận"
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
