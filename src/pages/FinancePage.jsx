import React, { useMemo } from "react";
import useFetchTable from "../custom_hooks/useFetchTable";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "styled-components";
import useFetch from "../custom_hooks/useFetch";

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
        defaultValue: "pending",
      },
    ],
  },
];

const handleFinancesResponse = (data) => {
  const finances = data.map((item) => {
    return {
      label: item.name,
      value: item.idx,
    };
  });
  return finances;
};

const FinancePage = () => {
  const theme = useTheme();

  const handleResponce = (data) => {
    return data.map((item) => {
      const { name: locationName } = item.location;
      return {
        ...item,
        financeName: item.name,
        locationName,
      };
    });
  };

  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/finance/`,
    columnsToHide: ["idx", "location", "name"],
    responseHandler: handleResponce,
  });

  const { loading: loadingFinances, data: finances } = useFetch({
    url: `${mainUrl}/cooperative/finance`,
    responseHandler: handleFinancesResponse,
  });
  if (finances) {
    filterFields[0].inputs[0].options = finances.data;
  }
  const data = useMemo(() => rowData, [rowData]);

  return (
    <div>
      <BaseTable
        isLoading={loading}
        data={data}
        columns={columns}
        filterFields={filterFields}
        loading={loadingFinances}
      />
    </div>
  );
};

export default FinancePage;
