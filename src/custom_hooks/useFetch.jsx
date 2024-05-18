import axios from "axios";
import { useEffect, useState } from "react";


const useFetch = ({ url, returnResponse=false }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        try {
            setLoading(true);
            const fetchData = async () => {
                const responseData = await axios.get(url);
                if (returnResponse) {
                    setData(responseData);
                    return;
                }
                setData(responseData.data);
                setLoading(false);
            }
            fetchData();

        } catch (error) {
            console.log(error);
        }
    }, [])

    return { loading, data }
}

export default useFetch