import axios from "axios";
import { useEffect, useState } from "react";
import { humanizeString } from "../helpers";



const useFetchTable = ({ url, dataDecoder, columnsToHide = [], cellRenders = [] }) => {
    /**
     * Fetches data from the specified URL and decodes it using the provided dataDecoder function.
     * Sets the fetched data and columns in the state variables rowData and columns respectively.
     * Also sets the loading state to true while the data is being fetched and false once the data is fetched.
     *
     * @param {Object} options - The options object.
     * @param {string} options.url - The URL to fetch the data from.
     * @param {function} [options.dataDecoder] - The function to decode the fetched data. Provide the response data as an argument to the function to decode it.
     * @param {Array} [options.columnsToHide=[]] - The array of column accessor keys to hide. Defaults to an empty array.
     * @param {Object} [options.cellRenders] - The object of cell renderers. Defaults to an empty object.
     * @return {Object} - An object containing the loading state, rowData, and columns.
     */

    const [loading, setLoading] = useState(false);
    const [rowData, setRawData] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
       const fetchData = async () => {
           try {
                setLoading(true);
               const response = await axios.get(url);
               if (response.status === 200) {
                    const data = dataDecoder ? dataDecoder(response.data) : response.data

                   setRawData(data);
                    let cols = Object.keys(data[0]);
                    cols = cols.map((item) => ({
                        header: humanizeString(item),
                        accessorKey: item
                    }));
                    cols = cols.filter((item) => !columnsToHide.includes(item.accessorKey));

                    // Override default cell renderers if provided
                    cols = cols.map((item) => {
                        if(cellRenders[item.accessorKey]) {
                            item.cell = cellRenders[item.accessorKey];
                        }
                        return item
                    })

                    setColumns(cols);
                    setLoading(false);

               }
           } catch (error) {
                console.log(error);
               setLoading(false);
           }
       }

        fetchData();
    }, [])

    return { loading, rowData, columns }
}

export default useFetchTable

