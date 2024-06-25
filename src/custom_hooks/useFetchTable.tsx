import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { humanizeString } from "../helpers";
import apiService from "../api_service";

type UseFetchTableProps<T> = {
  url: string;
  queryParams?: Record<string, any>;
  columnsToHide?: string[];
  responseHandler?: Function;
  customRenderer?: Record<
    string,
    (info: { getValue: () => string }) => JSX.Element
  >;
};

const useFetchTable = <T extends Object>({
  url,
  queryParams,
  columnsToHide = [],
  responseHandler,
  customRenderer,
}: UseFetchTableProps<T>) => {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState<T[]>([]);
  const [columns, setColumns] = useState<
    Array<{ header: string; accessorKey: string }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(url);
        if (response.status === 200) {
          let data = response.data;
          if (responseHandler) {
            data = responseHandler(data);
            console.log(data);
          }
          setRowData(data);

          let cols = Object.keys(data[0]).map((item) => ({
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
                  cell: customRenderer[item.accessorKey],
                };
              return item;
            });
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
