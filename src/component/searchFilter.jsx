import  { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { queryStringJson } from './queryString';
import "./style.css";
import { useForm } from "react-hook-form";

const SearchFilter = ({actionTypeOptions,applicationTypeOptions}) => {
    const { isQueryString,queryString } = queryStringJson();
    const [actionType, setActionType] = useState(queryString.actionType);
    const [applicationType, setApplicationType] = useState(queryString.applicationType);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [applicationId, setApplicationId] = useState(queryString.applicationId);
    const navigate = useNavigate();
    const location = useLocation();
    const { handleSubmit, register, reset } = useForm();
    const handleActionType =(e) => {
        setActionType(e.target.value)
    }
    const handleApplicationType =(e) => {
        setApplicationType(e.target.value)
    }
    const handleFromDate =(e) => {  
        setFromDate(e.target.value)
    }
    const handleToDate =(e) => {
        setToDate(e.target.value)
    }
    const handleApplicationId =(e) => {
        setApplicationId(e.target.value)
    }
    const search =(e) => {
        e.preventDefault()
        const values  = {actionType, applicationType, fromDate, toDate, applicationId}
        Object.keys(values).map((key) => !values[key] && delete values[key]);
        let keys = Object.keys(values);
        if (keys.length) {
          let qs = keys.reduce(
            (final, curr) =>
              (final += `${final ? "&" : "?"}${curr}=${values[curr]}`),
            ""
          );
         navigate(qs);
        }
    }
    useEffect(()=>{
        setActionType(queryString.actionType || '')
        setApplicationType(queryString.applicationType || '')
        setFromDate(queryString.fromDate || '')
        setToDate(queryString.toDate || '')
        setApplicationId(queryString.applicationId || '')
    },[location])

    
    return (
        <form onSubmit={search}>
            <div className='container-fluid pt-3'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-2'>
                                <div className='ml-2'><h5 className='text-center'>Action Type</h5></div>
                                <select className="form-select" aria-label="Default select example" onChange={handleActionType} value={actionType || ''} register={register}>
                                <>  <option value="" disabled>select</option> 
                                    {actionTypeOptions?.map((name, index) =>
                                        (<option value={name} key={index} >{name}</option>)
                                    )}
                                </>
                                </select>
                            </div> 
                            <div className='col-2'>
                                <div className='ml-2'><h5 className='text-center'>Application Type</h5></div>
                                <select className='form-select' aria-label="Default select example" onChange={handleApplicationType}  value={applicationType || ''} register={register}>
                                <>  <option value="" disabled>select</option> 
                                    {applicationTypeOptions?.map((name, index) =>
                                        (<option value={name} key={index} >{name}</option>)
                                )}
                                </>
                                
                                </select>
                            </div>
                            <div className='col-2'>
                            <div className='ml-2'><h5 className='text-center'>From Date</h5></div>
                                <input type="Date" {...(queryString?.fromDate && {
                                    defaultValue: new Date(queryString?.fromDate).toISOString().slice(0, 10),
                                    })} className="form-control" onChange={handleFromDate} register={register} />
                            </div>
                            <div className='col-2'>
                            <div className='ml-2'><h5 className='text-center'>TO Date</h5></div>
                                <input type="Date"{...(queryString?.toDate && {
                                    defaultValue: new Date(queryString?.toDate).toISOString().slice(0, 10),
                                    })} className="form-control" onChange={handleToDate} register={register}/>
                            </div>
                            <div className='col-2'>
                            <div className='ml-2'><h5 className='text-center'>Application ID</h5></div>
                                <input type="type" value={applicationId} className="form-control"  onChange={handleApplicationId} register={register}/>
                            </div>
                            <div className='col-2 pt-2'>
                                <button className='btn btn-primary mt-4'>Search Logger</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SearchFilter;
