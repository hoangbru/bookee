import React from "react";
import { Link } from "react-router-dom";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

type PaginationProps = {
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit?: number;
    nextPage?: number;
    prevPage?: number;
    totalDocs: number;
    totalPages: number;
  };
};

const Pagination: React.FC<PaginationProps> = ({ pagination }) => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Trước
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Sau
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Hiển thị từ <span className="font-medium">1</span> đến{" "}
            <span className="font-medium">{pagination.limit}</span> trong{" "}
            <span className="font-medium">{pagination.totalDocs}</span> kết quả
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              to="/"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Trước</span>
              <HiArrowSmLeft className="h-5 w-5" aria-hidden="true" />
            </Link>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 hover:bg-gray-50 focus:outline-offset-0" */}
            <button
              type="button"
              aria-current="page"
              className="relative z-10 inline-flex items-center border-t-2 border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {pagination.currentPage}
            </button>

            <button
              type="button"
              aria-current="page"
              className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {pagination.hasNextPage && <div>{pagination.nextPage}</div>}
            </button>

            <Link
              to="/"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Sau</span>
              <HiArrowSmRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
