import { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../../api/category";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type TModalUpdate = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  value: any;
};

export default function ModalUpdate({
  isOpen,
  onClose,
  title,
  value,
}: TModalUpdate) {
  const [name, setName] = useState(value?.name);

  useEffect(() => {
    setName(value?.name);
  }, [value?.name]);

  const [updateCategory, { isLoading: isLoadingCategory }] =
    useUpdateCategoryMutation();

  const onHandleConfirm = () => {
    updateCategory({ id: value.id, name: name })
      .unwrap()
      .then((res: any) => {
        onClose();
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
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {title}
                    </h3>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        <input
                          type="text"
                          value={name}
                          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          onChange={(e: any) => setName(e.target.value)}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={onHandleConfirm}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    {isLoadingCategory ? (
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
