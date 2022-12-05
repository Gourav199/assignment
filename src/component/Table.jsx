import  { useCallback } from 'react';
import { useState, useEffect } from 'react';
import DataTable from "react-data-table-component"
import SearchFilter from './searchFilter';
import Columns from './Columns';
import { useLocation } from 'react-router-dom';
import {queryStringJson} from "./queryString";
import moment from "moment"
import Hoc from './hoc';
const Table = ({data: details}) => {
    const location = useLocation()
    const [data, setData] = useState([]);
    const { isQueryString, queryString } = queryStringJson();
    useEffect(() => {
        
        console.log(queryString)
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
              (key) => `${rest[key]}` === `${curr[key]}`
            );
            flag1 && flag && acc.push(curr);
            return acc;
          }, []);
         setData(reducedArray);
        }
      }, [location, queryString]);
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
    
        return <div className='container-fluid'>
            <SearchFilter  actionTypeOptions={getOptions("actionType")}
                            applicationTypeOptions={getOptions("applicationType")}/>
            <DataTable columns={Columns} data ={data}  pagination  highlightOnHover  />
        </div>
   
}

export default Hoc(Table);
