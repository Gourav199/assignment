import { useCallback } from "react";
import { useState, useEffect } from "react";
import { useTable, useSortBy, usePagination,useFlexLayout } from "react-table";
import SearchFilter from "./searchFilter";
import Columns from "./Columns";
import { useLocation } from "react-router-dom";
import { queryStringJson } from "./queryString";
import moment from "moment";
import Hoc from "./hoc";
import "./style.css";
import { useMemo } from "react";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import Pagination from "./Pagination";
const Table = ({ data: details }) => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const { isQueryString, queryString } = queryStringJson();
  const columns = useMemo(() => Columns, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    pageCount,
    gotoPage,
    canPreviousPage,
    canNextPage,
    page,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 20 },
    },
    useSortBy,
    usePagination,
    useFlexLayout
  );
  useEffect(() => {
    if (!isQueryString) {
      setData(details);
    }
    if (isQueryString) {
      let reducedArray = details?.reduce((acc, curr) => {
        const { fromDate, toDate, ...rest } = queryString;
        let flag1 = true;
        if (fromDate && !toDate) {
          flag1 = moment(curr["creationTimestamp"]).isSameOrAfter(
            fromDate,
            "day"
          );
        }
        if (toDate && !fromDate) {
          flag1 = moment(curr["creationTimestamp"]).isSameOrBefore(
            toDate,
            "day"
          );
        }
        if (toDate && fromDate) {
          flag1 = moment(curr["creationTimestamp"]).isBetween(
            fromDate,
            toDate,
            "day",
            "[]"
          );
        }
        let flag = Object.keys(rest).every(
          (key) =>
            `${curr[key]}`.toLowerCase().indexOf(`${rest[key]}`.toLowerCase()) >
            -1
        );
        flag1 && flag && acc.push(curr);
        return acc;
      }, []);
      setData(reducedArray);
    }
  }, [location,details,isQueryString,queryString]);
  const getOptions = useCallback(
    (key) => {
      return (
        details &&
        Object.keys(
          details?.reduce((acc, curr) => {
            acc[curr[key]] = curr[key];
            return acc;
          }, {})
        )
      );
    },
    [details]
  );

  return (
    <div className="container-fluid ">
      <SearchFilter
        actionTypeOptions={getOptions("actionType")}
        applicationTypeOptions={getOptions("applicationType")}
      />
      {/* <DataTable columns={Columns} data ={data}  pagination  highlightOnHover  />  */}
      <table {...getTableProps} className="table">
        <thead className="tb-header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th  className="tb-header"{...column.getHeaderProps(column.getSortByToggleProps())}>
                   <div
                className="flex  justify-between th-width"
                title={
                  column.isSorted
                    ? column.isSortedDesc
                      ? "Desc"
                      : "Asc"
                    : "Sort"
                }
              >
                <p>
                  {column.render("Header")}
                </p>
                <span className="">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FaSortDown  className="tb-header"/>
                    ) : (
                      <FaSortUp className="tb-header"/>
                    )
                  ) : (
                    <FaSort className="tb-header"/>
                  )}
                </span>
              </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="h-[200px] text-center text-2xl opacity-50"
              >
                No Data
              </td>
            </tr>
          ) : (
            page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-center">
        <Pagination
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          currentPageCount={state.pageCount}
        />
      </div>
    </div>
  );
};

export default Hoc(Table);
