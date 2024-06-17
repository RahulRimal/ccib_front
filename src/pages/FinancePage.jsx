import React, { useMemo } from "react";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import { useTheme } from "styled-components";
import useFetch from "../custom_hooks/useFetch";
import * as yup from "yup";

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

const schema = yup.object().shape({
  name: yup.string(),
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

  const { loading: loadingFinances, data: finances } = useFetch({
    url: `${mainUrl}/cooperative/finance`,
    responseHandler: handleFinancesResponse,
  });
  if (finances) {
    filterFields[0].inputs[0].options = finances.data;
  }

  return (
    <div>
      <BaseTable
        url={`${mainUrl}/cooperative/finance/`}
        columnsToHide={["idx", "location", "name"]}
        filterFields={filterFields}
        loading={loadingFinances}
        noDataMessage="No Finance found"
        handleResponse={handleResponce}
        validationSchema={schema}
      />
    </div>
  );
};

export default FinancePage;
