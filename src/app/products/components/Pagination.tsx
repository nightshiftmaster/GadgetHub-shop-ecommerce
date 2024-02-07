import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  currPageHandler,
  pagesCount,
}: {
  currentPage: number;
  setCurrentPage: any;
  currPageHandler: any;
  pagesCount: number;
}) => {
  if (pagesCount < 2 || !pagesCount) {
    return;
  }
  return (
    <div>
      <ul className="cursor-pointer flex divide-x ring-1 rounded-md">
        <span
          className={`text-blue-400 flex justify-center items-center p-2 hover:ring-2 rounded-l-lg`}
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        >
          Prev
        </span>
        {Array(pagesCount)
          .fill(0)
          .map((_, index) => index + 1)
          .map((number, i) => {
            return (
              <li
                key={i}
                onClick={currPageHandler}
                value={number}
                className={`text-blue-400  p-3 hover:ring-2 ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {number}
              </li>
            );
          })}
        <span
          className={`text-blue-400 flex justify-center items-center p-2 hover:ring-2 rounded-r-lg `}
          onClick={() =>
            currentPage <= pagesCount - 1 && setCurrentPage(currentPage + 1)
          }
        >
          Next
        </span>
      </ul>
    </div>
  );
};

export default Pagination;
