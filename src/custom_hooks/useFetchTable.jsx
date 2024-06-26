import axios from "axios";
import { useEffect, useState } from "react";
import { humanizeString } from "../helpers";

const useFetchTable = ({ url, columnsToHide = [], responseHandler = null, customRenderer = null }) => {
    const [loading, setLoading] = useState(false);
    const [rowData, setRawData] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                if (response.status === 200) {
                    let data = response.data;
                    if (responseHandler) {
                        data = responseHandler(data);
                    }
                    setRawData(data);
                    let cols = Object.keys(data[0]);
                    cols = cols.map((item) => ({
                        header: humanizeString(item),
                        accessorKey: item,
                    }));
                    cols = cols.filter(
                        (item) => !columnsToHide.includes(item.accessorKey)
                    );

                    if (customRenderer) {
                        cols = cols.map((item) => {
                            if (customRenderer[item.accessorKey])
                            return {
                                ...item,
                                cell: customRenderer[item.accessorKey]
                            }
                            return item
                        }
                        );
                    }

                    setColumns(cols);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { loading, rowData, columns };
};

export default useFetchTable;