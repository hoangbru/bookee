import { useContext } from "react";
import { useGetAllCategoriesQuery } from "../api/category";
import { ICategory } from "../interfaces/category";
import { AppContext } from "../context/AppContext";

const Filters = () => {
  const context = useContext(AppContext);
  const { data: categories } = useGetAllCategoriesQuery("");
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Danh mục</h3>
      <ul
        role="list"
        className="space-y-2 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
      >
        <li className="w-full">
          <button
            type="button"
            className={`flex justify-start group w-full ${
              context.categoryIdSelected == "" ? "bg-indigo-500 text-white" : ""
            } rounded-sm opacity-90 block px-2 py-2`}
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
              } rounded-sm opacity-90 block px-2 py-2`}
              onClick={() => context.handleSetCategoryId(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Filters;
