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
    placeholder: "Select a loan",
  },
  {
    label: "Due Date",
    name: "due_date",
    type: "date",
    required: true,
    defaultValue: "",
    placeholder: "Select Due Date",
  },
  {
    label: "Paid Date",
    name: "paid_date",
    type: "date",
    required: true,
    defaultValue: "",
    placeholder: "Select Paid Date",
  },
  {
    label: "Total Due",
    name: "total_due",
    type: "number",
    step: "0.01",
    required: true,
    defaultValue: 0.0,
    placeholder: "Enter Total Due Amount",
  },
  {
    label: "Total Paid",
    name: "total_paid",
    type: "number",
    step: "0.01",
    required: true,
    defaultValue: 0.0,
    placeholder: "Enter Total Paid Amount",
  },
  {
    label: "Total Outstanding",
    name: "total_outstanding",
    type: "number",
    step: "0.01",
    required: true,
    defaultValue: 0.0,
    placeholder: "Enter Total Outstanding Amount",
  },
];

const schema = yup.object().shape({
  loan: yup.string().required("Loan is required"),
  due_date: yup.date().typeError("Required").required("Due date is required"),
  paid_date: yup.date().typeError("Required").required("Paid date is required"),
  total_due: yup
    .number()
    .typeError("Required")
    .required("Total due is required")
    .positive("Total due must be a positive number")
    .max(
      99999999.99,
      "Total due must have at most 10 digits in total and 2 decimal places"
    ),
  total_paid: yup
    .number()
    .typeError("Required")
    .required("Total paid is required")
    .positive("Total paid must be a positive number")
    .max(
      99999999.99,
      "Total paid must have at most 10 digits in total and 2 decimal places"
    ),
  total_outstanding: yup
    .number()
    .typeError("Required")
    .required("Total outstanding is required")
    .positive("Total outstanding must be a positive number")
    .max(
      99999999.99,
      "Total outstanding must have at most 10 digits in total and 2 decimal places"
    ),
});

const title = "Installment";
const endpoint = "cooperative/installments";

const handleResponse = (data) => {
  data = data.map((item) => {
    return {
      label: item.idx,
      value: item.idx,
    };
  });
  return data;
};

const InstallmentForm = () => {
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

export default InstallmentForm;
