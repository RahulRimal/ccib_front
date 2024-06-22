"use client";
import { mainUrl } from "@/app/constants";
import BaseTable from "@/app/components/Tables/BaseTable";

import useFetch from "@/custom_hooks/useFetch";
import * as yup from "yup";
import useFetchTable from "@/custom_hooks/useFetchTable";
import { useState } from "react";

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
  company: yup.string().required("Company name is required"),
  vat_num: yup
    .string()
    .nullable()
    .test(
      "vat-num-test",
      "VAT number must be greater than 7 characters",
      function (value) {
        return !value || (value && value.length >= 7);
      }
    )
    .required("Vat number is required"),

  pan_num: yup
    .string()
    .nullable()
    .test(
      "pan-num-test",
      "PAN number must be greater than 7 characters",
      function (value) {
        return !value || (value && value.length >= 7);
      }
    )
    .required("PAN number is required"),
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
  const [tableLoading, setTableLoading] = useState(false);

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

  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/companys`,
    columnsToHide: ["idx"],
  });

  const isEmptyObject = (obj) => Object.values(obj).every((value) => !value);
  const applyFilter = async (data, handleResponse = null) => {
    if (isEmptyObject(data)) {
      return;
    }

    try {
      setTableLoading(true);
      const response = await apiService.get(
        `${mainUrl}/cooperative/companys`,
        data
      );
      console.log(response);
      if (response.status === 200) {
        if (handleResponse) {
          response.data = handleResponse(response.data);
        }
        setData(response.data);
      }
      setTableLoading(false);
    } catch (error) {
      console.log(error);
      setTableLoading(false);
    }
  };

  return (
    <div>
      <BaseTable
        loading={loading}
        rowData={rowData}
        columns={columns}
        onFilter={applyFilter}
        filterFields={filterFields}
        noDataMessage={"Company not found"}
        validationSchema={schema}
        tableLoading={tableLoading}
      />
    </div>
  );
};

export default CompanyPage;
