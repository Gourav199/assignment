import React from "react";
import UseFetch from "./useFetch";

const Hoc = (WrapperComponent) => {
  return (props) => {
    const { loading, details } = UseFetch();
    if (loading) {
      return <h1>Loading ...</h1>
    }
    return <WrapperComponent {...props} data={details} />;
  };
};

export default Hoc;
