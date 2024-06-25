import React, { useEffect, useMemo, useState } from "react";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import { useTheme } from "styled-components";
import useFetch from "../custom_hooks/useFetch";
import * as yup from "yup";
import useFetchTable from "../custom_hooks/useFetchTable";
import apiService from "../api_service";
import { AdvanceFilter, Option } from "../models/misc";
import { Finance } from "../models/cooperative";
import { type } from "os";

const filterFields: AdvanceFilter[] = [
  {
    title: "Fields",
    inputs: [
      {
        label: "Finance name",
        name: "name",
        type: "select",
        basis: 30,
        options: [],
        required: true,
        defaultValue: "",
        placeholder: "",
      },
    ],
  },
];

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const handleResponse = (data: Finance[]) => {
  return data.map((item) => {
    const location_name = item.location?.name ?? "";
    return {
      ...item,
      finance_name: item.name,
      location_name,
    };
  });
};

const FinancePage: React.FC = () => {
  const theme = useTheme();

  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState<Finance[]>([]);

  const url = `${mainUrl}/cooperative/finance`;
  const { loading, rowData, columns } = useFetchTable<Finance>({
    url: url,
    responseHandler: handleResponse as any,
    columnsToHide: ["idx", "location", "name", "parent"],
  });

  useEffect(() => {
    setData(rowData);

    if (rowData && rowData.length > 0) {
      filterFields[0].inputs[0].options = rowData.map(
        (item: { name: string }) => {
          return {
            label: item.name,
            value: item.name,
          };
        }
      );
    }
  }, [rowData]);

  return (
    <div>
      <BaseTable
        rows={data}
        columns={columns}
        columnOrder={["finance_name", "location_name", "phone_number"]}
        filterFields={filterFields}
        onFilter={(data: Finance[]) =>
          apiService.filterTable(data, url, setData, setTableLoading, {
            responseHandler: handleResponse as any,
          })
        }
        loading={loading}
        tableLoading={tableLoading}
        noDataMessage="No Finance found"
        validationSchema={schema}
        height={""}
        title={""}
        toolbarActions={() => null}
        navigateOnRowClick={false}
      />
    </div>
  );
};

export default FinancePage;
