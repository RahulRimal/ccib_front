import React, { useEffect, useMemo, useState } from "react";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import { useTheme } from "styled-components";
import useFetch from "../custom_hooks/useFetch";
import * as yup from "yup";
import useFetchTable from "../custom_hooks/useFetchTable";
import apiService from "../api_service";

const filterFields = [
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
      },
    ],
  },
];

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});


const handleResponse = (data) => {
  return data.map((item) => {
    const { name: location_name } = item.location;
    return {
      ...item,
      finance_name: item.name,
      location_name,
    };
  });
};



const FinancePage = () => {
  const theme = useTheme();

  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState([]);

  const url = `${mainUrl}/cooperative/finance`;
  const { loading, rowData, columns } = useFetchTable({
    url: url,
    responseHandler: handleResponse,
    columnsToHide: ["idx", "location", "name", "parent"],
  });

  useEffect(() => {
    setData(rowData);

    if (rowData && rowData.length > 0) {
      filterFields[0].inputs[0].options = rowData.map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });
    }
  }, [rowData])

  return (
    <div>
      <BaseTable
        rows={data}
        columns={columns}
        columnOrder={["finance_name", "location_name", "phone_number"]}
        filterFields={filterFields}
        onFilter={(data) => apiService.filterTable(data, url, setData, setTableLoading, { responseHandler: handleResponse })} loading={loading}
        tableLoading={tableLoading}
        noDataMessage="No Finance found"
        validationSchema={schema}
      />
    </div>
  );
};

export default FinancePage;
