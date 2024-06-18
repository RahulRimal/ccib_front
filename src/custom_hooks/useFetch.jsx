import axios from "axios";
import { useEffect, useState } from "react";
import apiService from "../api_service";

const useFetch = ({ url, returnResponse = false, responseHandler = null }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async () => {
        const responseData = await apiService.get(url);
        if (returnResponse) {
          setLoading(false);
          setData(responseData);
          return;
        }
        if (responseHandler) {
          responseData.data = responseHandler(responseData.data);
          setLoading(false);
          setData(responseData);
          return;
        }
        setData(responseData.data);
        setLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { loading, data };
};

export default useFetch;
