import { useEffect, useState } from "react";
import { FormattedDate, FormattedTime, FormattedNumber } from "react-intl";
import { Link } from "react-router-dom";

import { Skeleton } from "antd";

import NoData from "../../../components/NoData";
import { Heading } from "../../../components/admin/ui/Heading";
import Separator from "../../../components/admin/ui/Separator";
import ModalConfirm from "../../../components/admin/ModalConfirm";

import { IOrder } from "../../../interfaces/order";

import { useGetAllOrdersQuery } from "../../../api/order";

const statusArray = [
  { id: "-1", label: "Huỷ" },
  { id: "0", label: "Chờ xử lý" },
  { id: "1", label: "Đang giao" },
  { id: "2", label: "Đã giao" },
];

const OrderList = () => {
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IOrder>();
  const handleOpenModalUpdate = (data: IOrder) => {
    setModalData(data);
    setOpenModalUpdate(true);
  };

  const closeModalUpdate = () => {
    setModalData(undefined);
    setOpenModalUpdate(false);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: ordersApi, isLoading } = useGetAllOrdersQuery(
    `?page=${currentPage}`
  );

  const [orders, setOrders] = useState(ordersApi);
  const [ordersList, setOrdersList] = useState<IOrder[]>([]);

  useEffect(() => {
    setCurrentPage(ordersApi?.result.currentPage);
  }, [ordersApi?.result.currentPage]);

  useEffect(() => {
    setOrders(ordersApi);
  }, [ordersApi]);

  useEffect(() => {
    setOrdersList(ordersApi?.data);
  }, [ordersApi?.data]);

  const totalPages = Math.ceil(
    orders?.result?.total / orders?.result?.itemPerPage
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
            <Heading title="Quản lý đơn hàng" />
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex justify-between items-center">
            <h2 className="flex items-start gap-2 text-lg font-semibold tracking-tight">
              <span>Danh sách</span>
              <span className="text-xs flex justify-center items-center text-white bg-gray-700 rounded-full w-5 h-5 p-3">
                {ordersApi?.result.total}
              </span>
            </h2>
            <div className="flex items-center py-4">
              <input
                type="text"
                name=""
                id=""
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
                placeholder="Tìm kiếm theo mã"
              />
            </div>
          </div>
          {/* tables */}
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Mã đơn hàng
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Người nhận
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Ngày đặt hàng
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Tổng giá
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Trạng thái
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
                      {(!ordersList || ordersList?.length == 0) && (
                        <tr className="border-0">
                          <td colSpan={6}>
                            <NoData />
                          </td>
                        </tr>
                      )}
                      {ordersList?.map((item: any) => {
                        return (
                          <tr className="border-0" key={item.id}>
                            <td className="p-4 align-middle">{item.code}</td>
                            <td className="p-4 align-middle">
                              {item.fullName}
                            </td>
                            <td className="p-4 align-middle">
                              <FormattedTime value={item?.createdAt} />,{" "}
                              <FormattedDate
                                value={item.createdAt}
                                year="numeric"
                                month="long"
                                day="numeric"
                              />
                            </td>
                            <td className="p-4 align-middle">
                              <FormattedNumber
                                value={item.amount!}
                                style="currency"
                                currency="VND"
                              />
                            </td>
                            <td className="p-4 align-middle">
                              {(() => {
                                switch (item?.status) {
                                  case "-1":
                                    return (
                                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20">
                                        Đã huỷ
                                      </span>
                                    );
                                  case "0":
                                    return (
                                      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                        Chờ xử lý
                                      </span>
                                    );
                                  case "1":
                                    return (
                                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                                        Đang giao
                                      </span>
                                    );
                                  case "2":
                                    return (
                                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20">
                                        Đã giao
                                      </span>
                                    );
                                  default:
                                    break;
                                }
                              })()}
                            </td>

                            <td className="p-4 align-middle">
                              <Link
                                to={`/order/${item.id}`}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 p-2 h-8 w-8"
                              >
                                <i className="bx bx-info-circle text-base"></i>
                              </Link>
                              <select
                                onChange={(e) => {
                                  handleOpenModalUpdate({
                                    ...item,
                                    status: e.target.value,
                                  });
                                }}
                                id="status"
                              >
                                {statusArray.map((value: any) => {
                                  return (
                                    <option
                                      key={value.id}
                                      value={value.id}
                                      selected={
                                        value.id == item?.status ? true : false
                                      }
                                      disabled={
                                        value.id == item?.status ? true : false
                                      }
                                    >
                                      {value.label}
                                    </option>
                                  );
                                })}
                              </select>
                              {/* <button className="relative inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 p-2 h-8 w-8">
                                <i className="bx bx-edit text-base"></i>
                              </button> */}
                              <ModalConfirm
                                isOpen={openModalUpdate}
                                onClose={closeModalUpdate}
                                title="Cảnh báo"
                                value={modalData}
                                type="order"
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

export default OrderList;
