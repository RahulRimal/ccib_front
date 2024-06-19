import React, { useEffect, useState } from "react";
import BaseForm from "./BaseForm";
import useFetch from "../../custom_hooks/useFetch";
import { mainUrl } from "../../constants";
import * as yup from "yup";

let fields = [
  {
    label: "Loan",
    name: "loan",
    type: "select",
    required: true,
    defaultValue: "",
    placeholder: "Select the loan",
  },
  {
    label: "Type",
    name: "type",
    type: "select",
    options: [
      { value: "real state", label: "Real State" },
      { value: "fixed asset", label: "Fixed Asset" },
      { value: "higher purchase", label: "Higher Purchase" },
    ],
    required: true,
    defaultValue: "real state",
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
    required: true,
    defaultValue: "",
    placeholder: "Enter Description",
  },
  {
    label: "Ownership Type",
    name: "ownership_type",
    type: "select",
    options: [
      { value: "own", label: "Own" },
      { value: "third party", label: "Third Party" },
    ],
    required: true,
    defaultValue: "own",
  },
  {
    label: "Coverage Percentage",
    name: "coverage_percentage",
    type: "number",
    step: "0.01",
    required: true,
    defaultValue: "",
    placeholder: "Enter Coverage Percentage",
  },
  {
    label: "Nature of Charge",
    name: "nature_of_charge",
    type: "select",
    required: true,
    defaultValue: "term",
    options: [
      { value: "term", label: "Term" },
      { value: "od", label: "Overdraft" },
    ],
    readOnly: true,
  },
  {
    label: "Latest Value",
    name: "latest_value",
    type: "number",
    step: "0.01",
    required: true,
    defaultValue: "",
    placeholder: "Enter Latest Value",
  },
  {
    label: "Latest Valuation Date",
    name: "latest_valuation_date",
    type: "date",
    required: true,
    defaultValue: "",
    placeholder: "Enter Latest Valuation Date",
  },
];

const schema = yup.object().shape({
  loan: yup.string().required("Loan is required"),
  type: yup
    .string()
    .oneOf(["real state", "fixed asset", "higher purchase"], "Invalid Type")
    .required("Type is required"),
  description: yup.string().required("Description is required"),
  ownership_type: yup
    .string()
    .oneOf(["own", "third party"], "Invalid Ownership Type")
    .required("Ownership Type is required"),
  coverage_percentage: yup
    .number()
    .typeError("Coverage Percentage must be greater than 0")
    .required("Coverage Percentage is required")
    .positive("Coverage Percentage must be a positive number")
    .max(100, "Coverage Percentage must be at most 100"),
  nature_of_charge: yup
    .string()
    .oneOf(["term", "od"], "Invalid Nature of Charge")
    .required("Nature of Charge is required"),
  latest_value: yup
    .number()
    .typeError("Latest Value must be greater than 0")
    .required("Latest Value is required")
    .positive("Latest Value must be a positive number"),
  latest_valuation_date: yup
    .date()
    .typeError("Latest Valuation Date must be a valid date")
    .required("Latest Valuation Date is required"),
});

const title = "Security Deposit";
const endpoint = "cooperative/securitydeposits";

const handleResponse = (data) => {
  data = data.map((item) => {
    return {
      label: item.idx,
      value: item.idx,
    };
  });
  return data;
};

const SecurityDepositForm = () => {
  const { loading, data } = useFetch({
    url: `${mainUrl}/cooperative/loans/`,
    responseHandler: handleResponse,
  });
  if (data) {
    fields = fields.map((item) => {
      if (item.name === "loan") {
        item.options = data.data;
      }
      return item;
    });
  }
  return (
    <BaseForm
      title={title}
      fields={fields}
      schema={schema}
      endpoint={endpoint}
      loading={loading}
    />
  );
};

export default SecurityDepositForm;
