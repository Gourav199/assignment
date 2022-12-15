import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { queryStringJson } from "./queryString";
import "./style.css";

const SearchFilter = ({ actionTypeOptions, applicationTypeOptions }) => {
  const { queryString } = queryStringJson();
  const [actionType, setActionType] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  applicationTypeOptions.shift() 
  const handleActionType = (e) => {
    setActionType(e.target.value);
  };
  const handleApplicationType = (e) => {
    setApplicationType(e.target.value);
  };
  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
  };
  const handleApplicationId = (e) => {
    setApplicationId(e.target.value);
  };
  const search = (e) => {
    e.preventDefault();
    const values = {
      actionType,
      applicationType,
      fromDate,
      toDate,
      applicationId,
    };
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
  };
  useEffect(() => {
    setActionType(queryString.actionType || "");
    setApplicationType(queryString.applicationType || "");
    setFromDate(
      queryString?.fromDate
        ? new Date(queryString?.fromDate).toISOString().slice(0, 10)
        : ""
    );
    setToDate(
      queryString?.toDate
        ? new Date(queryString?.toDate).toISOString().slice(0, 10)
        : ""
    );
    setApplicationId(queryString.applicationId || "");
  }, [
    location,
    queryString.actionType,
    queryString.applicationType,
    queryString.fromDate,
    queryString.toDate,
    queryString.applicationId
  ]);

  return (
    <form onSubmit={search}>
      <div className="container-fluid pt-3">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-2">
                <div className="ml-2">
                  <h5 className="text-center">Action Type</h5>
                </div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleActionType}
                  value={actionType}
                >
                  <>
                    {" "}
                    <option value="" disabled>
                      select
                    </option>
                    {actionTypeOptions?.map((name, index) => (
                      <option value={name} key={index}>
                        {name}
                      </option>
                    ))}
                  </>
                </select>
              </div>
              <div className="col-2">
                <div className="ml-2">
                  <h5 className="text-center">Application Type</h5>
                </div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleApplicationType}
                  value={applicationType}
                >
                  <>
                    {" "}
                    <option value="" disabled>
                      select
                    </option>
                    {applicationTypeOptions?.map((name, index) => (
                      <option value={name} key={index}>
                        {name}
                      </option>
                    ))}
                  </>
                </select>
              </div>
              <div className="col-2">
                <div className="ml-2">
                  <h5 className="text-center">From Date</h5>
                </div>
                <input
                  type="Date"
                  value={fromDate}
                  className="form-control"
                  onChange={handleFromDate}
                />
              </div>
              <div className="col-2">
                <div className="ml-2">
                  <h5 className="text-center">TO Date</h5>
                </div>
                <input
                  type="Date"
                  value={toDate}
                  className="form-control"
                  onChange={handleToDate}
                />
              </div>
              <div className="col-2">
                <div className="ml-2">
                  <h5 className="text-center">Application ID</h5>
                </div>
                <input
                  type="type"
                  value={applicationId}
                  className="form-control"
                  onChange={handleApplicationId}
                />
              </div>
              <div className="col-2 pt-2">
                <button className="btn btn-primary mt-4">Search Logger</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchFilter;
