"use client";
import React, { useMemo } from "react";
import { mainUrl } from "@/app/constants";
import BaseTable from "@/app/components/Tables/BaseTable";
import { useTheme } from "styled-components";
import useFetch from "@/custom_hooks/useFetch";
import * as yup from "yup";
import useFetchTable from "@/custom_hooks/useFetchTable";

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

const handleFinancesResponse = (data) => {
  const finances = data.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  });
  return finances;
};

const FinancePage = () => {
  const theme = useTheme();

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

  const { loading: loadingFinances, data: finances } = useFetch({
    url: `${mainUrl}/cooperative/finance`,
    responseHandler: handleFinancesResponse,
  });
  if (finances) {
    filterFields[0].inputs[0].options = finances.data;
  }

  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/finance/`,
    columnsToHide: ["idx", "location", "name", "parent"],
    responseHandler: handleResponse,
  });

  return (
    <div>
      <BaseTable
        rowData={rowData}
        columns={columns}
        columnOrder={["finance_name", "location_name", "phone_number"]}
        filterFields={filterFields}
        loading={loading}
        noDataMessage="No Finance found"
        validationSchema={schema}
        handleResponse={handleResponse}
      />
    </div>
  );
};

export default FinancePage;
