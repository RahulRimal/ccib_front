import React, { useEffect, useMemo, useState } from "react";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";

import useFetch from "../custom_hooks/useFetch";
import * as yup from "yup";
import useFetchTable from "../custom_hooks/useFetchTable";
import apiService from "../api_service";
import { AdvanceFilter } from "../models/misc";
import { Company } from "../models/cooperative";

let filterFields: AdvanceFilter[] = [
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
  name: yup.string().required("Company name is required"),
  vat_num: yup
    .string()
    .nullable()
    .test(
      "vat-num-test",
      "VAT number must be at least 7 characters",
      function (value) {
        return !value || value.length >= 7;
      }
    )
    .required("VAT number is required"),
  pan_num: yup
    .string()
    .nullable()
    .test(
      "pan-num-test",
      "PAN number must be at least 7 characters",
      function (value) {
        return !value || value.length >= 7;
      }
    )
    .required("PAN number is required"),
});

const CompanyPage = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [data, setData] = useState<Company[]>([]);

  const url = `${mainUrl}/cooperative/companys`;

  const { loading, rowData, columns } = useFetchTable<Company>({
    url: url,
    columnsToHide: ["idx"],
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
        filterFields={filterFields}
        onFilter={(data: Company[]) =>
          apiService.filterTable(data, url, setData, setTableLoading)
        }
        loading={loading}
        tableLoading={tableLoading}
        noDataMessage={"Company not found"}
        validationSchema={schema}
        height={""}
        title={""}
      />
    </div>
  );
};

export default CompanyPage;
