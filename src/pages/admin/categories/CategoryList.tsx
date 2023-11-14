import { useEffect, useState } from "react";
import { ICategory } from "../../../interfaces/category";
import { useGetAllCategoriesQuery } from "../../../api/category";
import { Skeleton } from "antd";
import { FormattedDate } from "react-intl";
import NoData from "../../../components/NoData";
import FormAddCategory from "../../../components/admin/categories/FormAddCategory";
import ModalConfirm from "../../../components/admin/ModalConfirm";
import ModalUpdate from "../../../components/admin/categories/ModalUpdate";
import { Heading } from "../../../components/admin/ui/Heading";
import Separator from "../../../components/admin/ui/Separator";

const CategoryList = () => {
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ICategory>();

  const handleOpenModalDelete = (data: ICategory) => {
    setModalData(data);
    setOpenModalDelete(true);
  };

  const closeModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleOpenModalUpdate = (data: ICategory) => {
    setModalData(data);
    setOpenModalUpdate(true);
  };

  const closeModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: categoriesApi, isLoading } = useGetAllCategoriesQuery(
    `?page=${currentPage}`
  );

  const [categories, setCategories] = useState(categoriesApi);
  const [categoriesList, setCategoriesList] = useState<ICategory[]>([]);

  useEffect(() => {
    setCurrentPage(categoriesApi?.result.currentPage);
  }, [categoriesApi?.result.currentPage]);

  useEffect(() => {
    setCategories(categoriesApi);
  }, [categoriesApi]);

  useEffect(() => {
    setCategoriesList(categoriesApi?.data);
  }, [categoriesApi?.data]);

  const totalPages = Math.ceil(
    categories?.result?.total / categories?.result?.itemPerPage
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

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <Heading title="Quản lý danh mục" />
          </div>
        </div>

        <Separator />

        <FormAddCategory />

        <Separator />

        <div>
          <div className="flex justify-between items-center">
            <h2 className="flex items-start gap-2 text-lg font-semibold tracking-tight">
              <span>Danh sách</span>
              <span className="text-xs flex justify-center items-center text-white bg-gray-700 rounded-full w-5 h-5 p-3">
                {categoriesApi?.result.total}
              </span>
            </h2>
            <div className="flex items-center py-4">
              <input
                type="text"
                name=""
                id=""
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
                placeholder="Tìm kiếm theo tên"
              />
            </div>
          </div>

          {/* table */}
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Tên
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Ngày tạo
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  {isLoading ? (
                    <tr className="border-0">
                      <td colSpan={4}>
                        <Skeleton active />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {(!categoriesList || categoriesList.length == 0) && (
                        <tr className="border-0">
                          <td colSpan={4}>
                            <NoData />
                          </td>
                        </tr>
                      )}
                      {categoriesList?.map((item: ICategory) => {
                        return (
                          <tr className="border-0" key={item.id}>
                            <td className="p-4 align-middle">{item.name}</td>
                            <td className="p-4 align-middle">
                              <FormattedDate
                                value={item.createdAt}
                                year="numeric"
                                month="long"
                                day="numeric"
                              />
                            </td>
                            <td className="p-4 align-middle">
                              <button
                                onClick={() => handleOpenModalUpdate(item)}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 p-2 h-8 w-8"
                              >
                                <i className="bx bx-edit text-base"></i>
                              </button>
                              <ModalUpdate
                                isOpen={openModalUpdate}
                                onClose={closeModalUpdate}
                                title="Cập nhật danh mục"
                                value={modalData}
                              />
                              <button
                                onClick={() => handleOpenModalDelete(item)}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 p-2 h-8 w-8"
                              >
                                <i className="bx bx-trash-alt text-base"></i>
                              </button>
                              <ModalConfirm
                                isOpen={openModalDelete}
                                onClose={closeModalDelete}
                                title="Cảnh báo"
                                value={modalData}
                                type="category"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* paginate */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <button
              onClick={onHandlePrevClick}
              disabled={currentPage == 1}
              className={`${
                currentPage == 1 ? "cursor-not-allowed opacity-50" : ""
              } inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3`}
            >
              Trước
            </button>
            {pageList?.map((page: number) => {
              return (
                <button
                  key={page}
                  onClick={() => onHandlePageChange(page)}
                  className={`${
                    page == currentPage ? "bg-gray-200" : ""
                  } inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 border border-gray-200"`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={onHandleNextClick}
              disabled={currentPage == totalPages}
              className={`${
                currentPage == totalPages ? "cursor-not-allowed opacity-50" : ""
              } inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3`}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
