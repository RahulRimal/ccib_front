import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { humanizeString } from "../helpers";
import apiService from "../api_service";

type UseFetchTableProps = {
  url: string;
  queryParams?: Record<string, any>;
  columnsToHide?: string[];
  responseHandler?: Function | null;
  customRenderer?: Record<string, (data: any) => JSX.Element> | null;
};

const useFetchTable = ({
  url,
  queryParams = {},
  columnsToHide = [],
  responseHandler = null,
  customRenderer = null,
}: UseFetchTableProps) => {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState<any[]>([]);
  const [columns, setColumns] = useState<
    Array<{ header: string; accessorKey: string }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(url);
        if (response.status === 200) {
          let data: any[] = response.data as any[];
          if (responseHandler) {
            data = responseHandler(data);
            console.log(data);
          }
          setRowData(data);
          let cols: any[] = Object.keys(data[0]) as any;
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
