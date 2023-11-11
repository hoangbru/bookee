import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { FormattedDate, FormattedNumber } from "react-intl";
import NoData from "../../../components/NoData";
import ModalConfirm from "../../../components/admin/ModalConfirm";
import { useGetAllProductsQuery } from "../../../api/product";
import { IProduct } from "../../../interfaces/product";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: productsApi, isLoading } = useGetAllProductsQuery(
    `?page=${currentPage}`
  );

  const [categories, setProducts] = useState(productsApi);
  const [categoriesList, setProductsList] = useState<IProduct[]>([]);

  useEffect(() => {
    setCurrentPage(productsApi?.result.currentPage);
  }, [productsApi?.result.currentPage]);

  useEffect(() => {
    setProducts(productsApi);
  }, [productsApi]);

  useEffect(() => {
    setProductsList(productsApi?.data);
  }, [productsApi?.data]);

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
            <h2 className="flex justify-center items-center gap-2 text-3xl font-bold tracking-tight">
              <span>Quản lý sản phẩm</span>
            </h2>
          </div>
          <div>
            <Link to="/admin/products/add" className="flex justify-center items-center gap-2 text-3xl font-bold tracking-tight">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white ml-auto">Thêm sản phẩm</button>
            </Link>
          </div>
        </div>

        <hr className="my-10" />

        <div>
          <div className="flex justify-between items-center">
            <h2 className="flex items-start gap-2 text-lg font-semibold tracking-tight">
              <span>Danh sách</span>
              <span className="text-xs flex justify-center items-center text-white bg-gray-700 rounded-full w-5 h-5 p-3">
                {productsApi?.result.total}
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
                      Ảnh
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Giá
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Tác giả
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
                      <td colSpan={6}>
                        <Skeleton active />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {(!categoriesList || categoriesList.length == 0) && (
                        <tr className="border-0">
                          <td colSpan={6}>
                            <NoData />
                          </td>
                        </tr>
                      )}
                      {categoriesList?.map((item: IProduct) => {
                        return (
                          <tr className="border-0" key={item.id}>
                            <td className="p-4 align-middle">{item.title}</td>
                            <td className="p-4 align-middle">
                              <img
                                src={item.image}
                                className="w-10 h-10 object-cover rounded-md"
                                alt=""
                              />
                            </td>
                            <td className="p-4 align-middle">
                              <FormattedNumber
                                value={item.price}
                                style="currency"
                                currency="VND"
                              />
                            </td>
                            <td className="p-4 align-middle">{item.author}</td>
                            <td className="p-4 align-middle">
                              <FormattedDate
                                value={item.createdAt}
                                year="numeric"
                                month="long"
                                day="numeric"
                              />
                            </td>
                            <td className="p-4 align-middle">
                              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 p-2 h-8 w-8">
                                <i className="bx bx-edit text-base"></i>
                              </button>
                              <button
                                onClick={() => setOpenModal(true)}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 p-2 h-8 w-8"
                              >
                                <i className="bx bx-trash-alt text-base"></i>
                              </button>
                              <ModalConfirm
                                isOpen={openModal}
                                onClose={closeModal}
                                title="Cảnh báo"
                                value={item}
                                type="product"
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

export default ProductList;
