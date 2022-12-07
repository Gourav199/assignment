import React from "react";
import ReactPaginate from "react-paginate";
import "./style.css";
import {
  BsCaretLeftFill,
  BsFillCaretRightFill,
  BsThreeDots,
} from "react-icons/bs";

function Pagination({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  currentPageCount,
}) {
  return (
    <ReactPaginate
      className="flex items-center gap-x-2"
      pageClassName="bg-gray-200 rounded-md cursor-pointer overflow-hidden"
      activeClassName="bg-gray-400"
      previousClassName="px-1"
      nextClassName="px-1"
      pageLinkClassName="w-full h-full p-2"
      breakLabel={<BsThreeDots />}
      nextLabel={
        <BsFillCaretRightFill
          className={`${!canNextPage ? "opacity-50" : ""}`}
          {...(canNextPage && {
            onClick: () => gotoPage(currentPageCount + 1),
          })}
        />
      }
      onPageChange={(e) => gotoPage(+e.selected)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={
        <BsCaretLeftFill
          className={`${!canPreviousPage ? "opacity-50" : ""}`}
          {...(canPreviousPage && {
            onClick: () => gotoPage(currentPageCount - 1),
          })}
        />
      }
      renderOnZeroPageCount={null}
    />
  );
}

export default React.memo(Pagination);
