import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

import { Heading } from "../../../components/admin/ui/Heading";
import Separator from "../../../components/admin/ui/Separator";

import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../api/product";
import { useGetAllCategoriesQuery } from "../../../api/category";

import { ICategory } from "../../../interfaces/category";

import { supabase } from "../../../utils/supabase";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: bookById } = useGetProductByIdQuery(id || "");
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const { data: categoriesApi } = useGetAllCategoriesQuery("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  useEffect(() => {
    setValue("title", bookById?.data.title);
    setValue("author", bookById?.data.author);
    setValue("price", bookById?.data.price);
    setValue("publishedDate", bookById?.data.publishedDate);
  }, [setValue, bookById]);

  useEffect(() => {
    setCategories(categoriesApi?.data);
  }, [categoriesApi]);

  const onHandleSubmit = async (value: any) => {
    if (!value.image[0]) {
      updateProduct({
        id: Number(id),
        title: bookById?.data.title,
        image: bookById?.data.image,
        author: bookById?.data.author,
        price: Number(bookById?.data.price),
        categoryId: Number(bookById?.data.categoryId),
      })
        .unwrap()
        .then((response: any) => {
          toast.success(response.message);
          reset();
          navigate("/admin/products");
        })
        .catch((response: any) => {
          toast.error(response.data.message);
        });
    } else {
      setLoadingImage(true);
      let file;
      if (value.image[0]) {
        file = value.image[0];
      }

      const { data, error } = await supabase.storage
        .from("images")
        .upload("bookee/" + file?.name, file);

      if (data) {
        setLoadingImage(false);
        updateProduct({
          id: Number(id),
          title: value.title,
          image: `${
            import.meta.env.VITE_SUPABASE_URL
          }/storage/v1/object/public/images/${data.path}`,
          author: value.author,
          price: Number(value.price),
          categoryId: Number(value.categoryId),
        })
          .unwrap()
          .then((response: any) => {
            toast.success(response.message);
            reset();
            navigate("/admin/products");
          })
          .catch((response: any) => {
            toast.error(response.data.message);
          });
      } else if (error) {
        toast.error("Đã xảy ra lỗi khi tải ảnh lên");
      }
    }
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title={"Thêm mới sản phẩm"} />
        <Separator />
        <form
          onSubmit={handleSubmit(onHandleSubmit)}
          className="space-y-8 w-full"
        >
          <div className="lg:grid grid-cols-3">
            <div className="space-y-2 py-1 col-span-1">
              <label htmlFor="image">Ảnh bìa</label>
              <input
                type="file"
                id="image"
                accept="/images/*"
                {...register("image")}
                className="flex h-10 w-auto cursor-pointer rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <div className="mb-4 flex items-center gap-4">
                <div className="relative w-[350px] h-[250px] rounded-md overflow-hidden">
                  {/* <button
                    type="button"
                    onClick={() => setImageUploaded("")}
                    className="absolute top-0 right-0 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3"
                  >
                    <HiTrash className="h-4 w-4 text-red-500" />
                  </button> */}
                  <img
                    className="object-cover w-full h-full border border-gray-100 rounded-md"
                    alt="Image"
                    src={bookById?.data.image}
                  />
                </div>
              </div>
            </div>
            <div className="md:grid md:grid-cols-3 lg:col-span-2 gap-8">
              <div className="space-y-2 py-1">
                <label htmlFor="title">Tiêu đề sách</label>
                <input
                  id="title"
                  type="text"
                  {...register("title", {
                    required: "Không được bỏ trống",
                  })}
                  placeholder="VD: Sách giáo dục"
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.title && (
                  <span className="text-sm text-red-500">
                    {errors.title.message as React.ReactNode}
                  </span>
                )}
              </div>
              <div className="space-y-2 py-1">
                <label htmlFor="author">Tác giả</label>
                <input
                  id="author"
                  type="text"
                  {...register("author", {
                    required: "Không được bỏ trống",
                  })}
                  placeholder="VD: Nguyễn Nhật Ánh"
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.author && (
                  <span className="text-sm text-red-500">
                    {errors.author.message as React.ReactNode}
                  </span>
                )}
              </div>
              <div className="space-y-2 py-1">
                <label htmlFor="categoryId">Danh mục</label>
                <select
                  id="categoryId"
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("categoryId", {
                    required: "Không được bỏ trống",
                  })}
                  defaultValue={0}
                >
                  <option value={0} disabled>
                    Lựa chọn danh mục
                  </option>
                  {categories?.map((item: ICategory) => {
                    return (
                      <option
                        key={item.id}
                        value={item.id}
                        selected={
                          bookById?.data.categoryId == item.id ? true : false
                        }
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {errors.categoryId && (
                  <span className="text-sm text-red-500">
                    {errors.categoryId.message as React.ReactNode}
                  </span>
                )}
              </div>
              <div className="space-y-2 py-1">
                <label htmlFor="author">Giá(VND)</label>
                <input
                  id="price"
                  type="text"
                  {...register("price", {
                    required: "Không được bỏ trống",
                    pattern: {
                      value: /^[0-9]*[1-9][0-9]*$/,
                      message: "Giá trị phải là số dương",
                    },
                  })}
                  placeholder="VD: 125000"
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.price && (
                  <span className="text-sm text-red-500">
                    {errors.price.message as React.ReactNode}
                  </span>
                )}
              </div>
              <div className="space-y-2 py-1">
                <label htmlFor="publishedDate">Ngày phát hành</label>
                <input
                  id="publishedDate"
                  type="date"
                  {...register("publishedDate")}
                  placeholder="VD: Nguyễn Nhật Ánh"
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2 py-1">{/*  */}</div>
              <div className="space-y-2 py-1">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white ml-auto">
                  {isLoading || loadingImage ? (
                    <AiOutlineLoading3Quarters
                      className="animate-spin"
                      size={20}
                    />
                  ) : (
                    "Gửi"
                  )}
                </button>
                <button
                  type="reset"
                  className="ml-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-gray-200 text-gray-600"
                >
                  Làm lại
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
