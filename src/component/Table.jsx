import  { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { useTable, useSortBy } from "react-table"
import SearchFilter from './searchFilter';
import Columns from './Columns';
import { useLocation } from 'react-router-dom';
import {queryStringJson} from "./queryString";
import moment from "moment"
import Hoc from './hoc';
import "./style.css";
import { useMemo } from 'react';
import { FaSortUp, FaSortDown } from "react-icons/fa";

const Table = ({data: details}) => {
    const location = useLocation()
    const [data, setData] = useState([]);
    const { isQueryString, queryString } = queryStringJson();
    const columns  = useMemo(()=> Columns,[])
    const {getTableProps, getTableBodyProps,headerGroups,rows, prepareRow} = useTable({
      columns:columns,
      data:data,
    }, useSortBy)
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
              (key) => `${curr[key]}`.toLowerCase().indexOf(`${rest[key]}`.toLowerCase())  >-1
            );
            flag1 && flag && acc.push(curr);
            return acc;
          }, []);
         setData(reducedArray);
        }
      }, [location, queryString, details,isQueryString]);
    const getOptions = useCallback(
        (key) => {
          return  details && Object.keys(
           details?.reduce((acc, curr) => {
              acc[curr[key]] = curr[key];
              return acc;
            }, {})
          );
        },
        [details]
      );
    
        return <div className='container-fluid '>
            <SearchFilter  actionTypeOptions={getOptions("actionType")}
                            applicationTypeOptions={getOptions("applicationType")}/>
            {/* <DataTable columns={Columns} data ={data}  pagination  highlightOnHover  />  */}
            <table {...getTableProps} className='table'>
              <thead>
                {headerGroups.map((headerGroup)=> (
                  <tr{...headerGroup.getHeaderGroupProps}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} scope="col">
                        {column.render('Header')}
                        {column.isSorted ? (column.isSortedDesc? <FaSortDown /> : <FaSortUp />): ''}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row,i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell)=> (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  )
                })}
                <tr>
                  <td> </td>
                </tr>
              </tbody>
            </table>
        </div>
   
}

export default Hoc(Table);
