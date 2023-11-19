import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Skeleton } from "antd";

import NoData from "../../../components/NoData";
import { Heading } from "../../../components/admin/ui/Heading";
import Separator from "../../../components/admin/ui/Separator";

import { IUser } from "../../../interfaces/user";

import { useGetAllUsersQuery } from "../../../api/user";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: usersApi, isLoading } = useGetAllUsersQuery(
    `${currentPage ? `?page=${currentPage}` : ""}`
  );

  const [users, setUsers] = useState(usersApi);
  const [usersList, setUsersList] = useState<IUser[]>([]);

  useEffect(() => {
    setCurrentPage(usersApi?.result.currentPage);
  }, [usersApi?.result.currentPage]);

  useEffect(() => {
    setUsers(usersApi);
  }, [usersApi]);

  useEffect(() => {
    setUsersList(usersApi?.data);
  }, [usersApi?.data]);

  const totalPages = Math.ceil(
    users?.result?.total / users?.result?.itemPerPage
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
            <Heading title="Quản lý người dùng" />
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex justify-between items-center">
            <h2 className="flex items-start gap-2 text-lg font-semibold tracking-tight">
              <span>Danh sách</span>
              <span className="text-xs flex justify-center items-center text-white bg-gray-700 rounded-full w-5 h-5 p-3">
                {usersApi?.result.total}
              </span>
            </h2>
          </div>
          {/* tables */}
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Tên đăng nhập
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Họ và tên
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Số điện thoại
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Email
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
                      {(!usersList || usersList?.length == 0) && (
                        <tr className="border-0">
                          <td colSpan={6}>
                            <NoData />
                          </td>
                        </tr>
                      )}
                      {usersList?.map((item: IUser) => {
                        return (
                          <tr className="border-0" key={item.id}>
                            <td className="p-4 align-middle">{item.username}</td>
                            <td className="p-4 align-middle">
                              {item.fullName}
                            </td>
                            <td className="p-4 align-middle">
                              {item.phone}
                            </td>
                            <td className="p-4 align-middle">
                              {item.email}
                            </td>

                            <td className="p-4 align-middle">
                              <Link
                                to={`/admin/users/${item.id}/show`}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground hover:bg-gray-200 p-2 h-8 w-8"
                              >
                                <i className="bx bx-info-circle text-base"></i>
                              </Link>
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

export default UserList;
