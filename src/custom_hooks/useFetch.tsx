import axios from "axios";
import { useEffect, useState } from "react";
import apiService from "../api_service";

type UseFetchProps = {
  url: string;
  returnResponse?: boolean;
  responseHandler?: any;
};

const useFetch = ({
  url,
  returnResponse = false,
  responseHandler = null,
}: UseFetchProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

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
