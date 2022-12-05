import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryStringJson } from './queryString';

const SearchFilter = ({actionTypeOptions,applicationTypeOptions}) => {
    const { queryString } = queryStringJson();
    const [actionType, setActionType] = useState(queryString.actionType);
    const [applicationType, setApplicationType] = useState(queryString.applicationType);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [applicationId, setApplicationId] = useState(queryString.applicationId);
    const navigate = useNavigate();
    const handleActionType =(e) => {
        setActionType(e.target.value)
    }
    const handleApplicationType =(e) => {
        setApplicationType(e.target.value)
    }
    const handleFromDate =(e) => {  
        setFromDate(e.target.value)
        console.log(fromDate)
    }
    const handleToDate =(e) => {
        setToDate(e.target.value)
    }
    const handleApplicationId =(e) => {
        setApplicationId(e.target.value)
    }
    const search =() => {
        const values  = {actionType, applicationType, fromDate, toDate, applicationId}
        Object.keys(values).map((key) => !values[key] && delete values[key]);
        let keys = Object.keys(values);
        if (keys.length) {
          let qs = keys.reduce(
            (final, curr) =>
              (final += `${final ? "&" : "?"}${curr}=${values[curr]}`),
            ""
          );
          console.log(values)
         navigate(qs);
        }
    }
    return (
        <div className='container-fluid pt-3'>
            <div className='row'>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-2'>
                            <div className='ml-2'><h5 className='text-center'>Action Type</h5></div>
                            <select className="form-select" aria-label="Default select example" onChange={handleActionType} value={actionType}>
                            {actionTypeOptions?.map((name,index) =>
                                    
                                    <option value={name} key={index}>{name}</option>
                            )}
                            </select>
                        </div> 
                        <div className='col-2'>
                            <div className='ml-2'><h5 className='text-center'>Application Type</h5></div>
                            <select className='form-select' aria-label="Default select example" onChange={handleApplicationType} value={applicationType}>
                            {applicationTypeOptions?.map((name, index) =>
                                    (<option value={name} key={index}>{name}</option>)
                            )}
                            </select>
                        </div>
                        <div className='col-2'>
                        <div className='ml-2'><h5 className='text-center'>From Date</h5></div>
                            <input type="Date" {...(queryString?.fromDate && {
          defaultValue: new Date(queryString?.fromDate).toISOString().slice(0, 10),
        })} className="form-control" onChange={handleFromDate} />
                        </div>
                        <div className='col-2'>
                        <div className='ml-2'><h5 className='text-center'>TO Date</h5></div>
                            <input type="Date"{...(queryString?.toDate && {
          defaultValue: new Date(queryString?.toDate).toISOString().slice(0, 10),
        })} className="form-control" onChange={handleToDate}/>
                        </div>
                        <div className='col-2'>
                        <div className='ml-2'><h5 className='text-center'>Application ID</h5></div>
                            <input type="type" value={applicationId} className="form-control"  onChange={handleApplicationId}/>
                        </div>
                        <div className='col-2 pt-2'>
                            <button className='btn btn-primary mt-4' onClick={search}>Search Logger</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchFilter;
