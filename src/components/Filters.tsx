import { useContext } from "react";
import { Disclosure } from "@headlessui/react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useGetAllCategoriesQuery } from "../api/category";
import { ICategory } from "../interfaces/category";
import { AppContext } from "../context/AppContext";

type FiltersProps = {
  filters: {
    id: string;
    name: string;
    options?: {
      value: any;
      label: any;
      checked: boolean;
    }[];
  }[];
};

const Filters: React.FC<FiltersProps> = ({ filters }) => {
  const productContext = useContext(AppContext);
  const { data: categories } = useGetAllCategoriesQuery("");
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Danh mục</h3>
      <ul
        role="list"
        className="space-y-2 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
      >
        {categories?.data.map((category: ICategory) => (
          <li key={category.id} className="w-full">
            <button
              type="button"
              className={`flex justify-start group w-full ${
                productContext.categorySelected.id == category.id
                  ? "bg-indigo-500 text-white"
                  : ""
              } rounded-sm opacity-90 block px-2 py-2`}
              onClick={() => productContext.setCategorySelected(category)}
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

      {filters?.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <HiMinus className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <HiPlus className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section?.options?.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

export default Filters;
