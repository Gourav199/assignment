import React, { useEffect, useState } from 'react';
import axios from "axios"
const UseFetch = () => {
    const baseUrl = "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f";
    const [details, setdetails] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {

       const getDetails = async () => {
        try {
            const response = await axios.get(baseUrl);
            setdetails(response.data.result.auditLog);
            setLoading(false)
        } catch (error) {
            console.log('error')
        }
    }
    getDetails()
    },[])
    
    return (
        {details, loading}
    );
}

export default UseFetch;
