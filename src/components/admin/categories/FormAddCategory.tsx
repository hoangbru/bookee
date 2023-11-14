import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useAddCategoryMutation } from "../../../api/category";

const FormAddCategory = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const onHandleSubmit = (value: any) => {
    addCategory(value)
      .unwrap()
      .then((response: any) => {
        toast.success(response.message);
        reset();
      })
      .catch((response: any) => {
        toast.error(response.data.message);
      });
  };
  return (
    <div className="pb-4">
      <h3 className="flex items-start gap-2 text-lg pb-4 font-semibold tracking-tight">
        Thêm mới danh mục
      </h3>
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="space-y-8 w-full"
      >
        <div className="flex gap-3">
          <div className="space-y-2 w-full lg:w-[40%] md:w-[50%] sm:w-[60%]">
            <input
              type="text"
              {...register("name", {
                required: "Không được bỏ trống",
              })}
              placeholder="VD: Sách giáo dục"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message as React.ReactNode}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white ml-auto">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={20} />
              ) : (
                "Gửi"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormAddCategory;
