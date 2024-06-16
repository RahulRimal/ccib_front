import React, { useMemo } from "react";
import useFetchTable from "../custom_hooks/useFetchTable";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "styled-components";
import useFetch from "../custom_hooks/useFetch";

let filterFields = [
  {
    title: "Fields",
    inputs: [
      {
        label: "Company name",
        name: "company",
        type: "select",
        basis: 30,
        options: [],
        required: true,
        defaultValue: "",
      },
      {
        label: "Vat number",
        name: "vat_num",
        type: "text",
        basis: 30,
        options: [],
        required: true,
        defaultValue: "",
      },
      {
        label: "Pan number",
        name: "pan_num",
        type: "text",
        basis: 30,
        options: [],
        required: true,
        defaultValue: "",
      },
    ],
  },
];

const handleCompanyResponse = (data) => {
  const company = data.map((item) => {
    return {
      label: item.name,
      value: item.idx,
    };
  });
  return company;
};

const CompanyPage = () => {
  const theme = useTheme();
  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/companys/`,
    columnsToHide: ["idx"],
  });

  const data = useMemo(() => rowData, [rowData]);

  //filter
  const { loading: loadingCompanies, data: companies } = useFetch({
    url: `${mainUrl}/cooperative/companys`,
    responseHandler: handleCompanyResponse,
  });
  if (companies) {
    filterFields = filterFields.map((item) => {
      item.inputs.map((input) => {
        if (input.name === "company") {
          input.options = companies.data;
        }
        return input;
      });
      return item;
    });
  }

  return (
    <div>
      <BaseTable
        isLoading={loading}
        data={data}
        columns={columns}
        filterFields={filterFields}
        loading={loadingCompanies}
        noDataMessage={"Company not found"}
      />
    </div>
  );
};

export default CompanyPage;
