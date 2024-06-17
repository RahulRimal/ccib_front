import React, { useMemo } from "react";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";

import useFetch from "../custom_hooks/useFetch";
import * as yup from "yup";

let filterFields = [
  {
    title: "Fields",
    inputs: [
      {
        label: "Company name",
        name: "name",
        type: "select",
        basis: 30,
        options: [],
        required: false,
        defaultValue: "",
        placeholder: "Enter company name.",
      },
      {
        label: "Vat number",
        name: "vat_num",
        type: "number",
        basis: 30,
        options: [],
        required: false,
        defaultValue: "",
        placeholder: "Enter vat number.",
      },
      {
        label: "Pan number",
        name: "pan_num",
        type: "number",
        basis: 30,
        options: [],
        required: false,
        defaultValue: "",
        placeholder: "Enter pan number.",
      },
    ],
  },
];

const schema = yup.object().shape({
  company: yup.string(),
  vat_num: yup
    .string()
    .nullable()
    .test(
      "vat-num-test",
      "VAT number must be greater than 7 characters",
      function (value) {
        return !value || (value && value.length >= 7);
      }
    ),

  pan_num: yup
    .string()
    .nullable()
    .test(
      "pan-num-test",
      "PAN number must be greater than 7 characters",
      function (value) {
        return !value || (value && value.length >= 7);
      }
    ),
});
const handleCompanyResponse = (data) => {
  const company = data.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  });
  return company;
};

const CompanyPage = () => {
  //filter
  const { loading: loadingCompanies, data: company } = useFetch({
    url: `${mainUrl}/cooperative/companys`,
    responseHandler: handleCompanyResponse,
  });
  if (company) {
    filterFields.map((item) => {
      item.inputs.map((input) => {
        if (input.name === "company") {
          input.options = company.data;
        }
        return input;
      });
      return item;
    });
  }

  return (
    <div>
      <BaseTable
        url={`${mainUrl}/cooperative/companys`}
        columnsToHide={["idx"]}
        filterFields={filterFields}
        noDataMessage={"Company not found"}
        validationSchema={schema}
      />
    </div>
  );
};

export default CompanyPage;
