import React, { useEffect, useState } from "react";
import BaseForm from "./BaseForm";
import useFetch from "../../custom_hooks/useFetch";
import { mainUrl } from "../../constants";
import * as yup from "yup";

let fields = [
  {
    label: "User",
    name: "user",
    type: "select",
    required: true,
    defaultValue: "",
    placeholder: "Select the user",
  },
  {
    label: "Finance",
    name: "finance",
    type: "select",
    required: true,
    defaultValue: "",
    placeholder: "Select the finance",
  },
  {
    label: "Account Number",
    name: "account_number",
    type: "text",
    required: true,
    defaultValue: "",
    maxLength: 20,
    placeholder: "Enter Account Number",
  },
  {
    label: "Loan Name",
    name: "name",
    type: "text",
    required: true,
    defaultValue: "",
    maxLength: 20,
    placeholder: "Enter Loan ",
  },
  {
    label: "Loan Amount",
    name: "loan_amount",
    type: "number",
    step: "0.01",
    required: true,
    defaultValue: 0.0,
    placeholder: "Enter Total Loan Amount",
  },
  {
    label: "Installment Amount",
    name: "installment_amount",
    type: "number",
    step: "",
    required: true,
    defaultValue: 0.0,
    placeholder: "Enter Instellment Amount",
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
    label: "Loan Outstanding",
    name: "loan_outstanding",
    type: "number",
    step: "0.01",
    required: true,
    defaultValue: 0.0,
    readOnly: true,
    placeholder: "Calculated Loan Outstanding",
  },
  {
    label: "Loan Limit",
    name: "loan_limit",
    type: "number",
    step: "0.01",
    defaultValue: 0.0,
    placeholder: "Enter Loan Limit",
  },
  {
    label: "Interest Rate",
    name: "interest_rate",
    type: "number",
    step: "0.01",
    required: true,
    defaultValue: 0.0,
    maxLength: 5,
    placeholder: "Enter Interest Rate",
  },
  {
    label: "Overdue Amount",
    name: "overdue_amount",
    type: "number",
    step: "0.01",
    defaultValue: 0.0,
    placeholder: "Enter Overdue Amount",
  },
  {
    label: "Maturity Date",
    name: "maturity_date",
    type: "date",
    defaultValue: "",
    placeholder: "Enter Maturity Date",
  },
  {
    label: "Status",
    name: "status",
    type: "select",
    options: [
      { value: "good", label: "Good" },
      { value: "watchlist", label: "Watchlist" },
      { value: "pass", label: "Pass" },
      { value: "npl", label: "Npl" },
      { value: "doubtful", label: "Doubtful" },
      { value: "bad debt", label: "Bad debt" },
    ],
    required: true,
    defaultValue: "good",
  },
  {
    label: "Loan Type",
    name: "loan_type",
    type: "select",
    options: [
      { value: "term", label: "Term" },
      { value: "overdraft", label: "Overdraft" },
    ],
    required: false,
    defaultValue: "term",
  },
  {
    label: "Is Closed",
    name: "is_closed",
    type: "radio",
    required: true,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    label: "Utilization Percent",
    name: "utilization_percent",
    type: "number",
    step: "0.01",
    defaultValue: 0.0,
    required: false,
    placeholder: "Enter Utilization Percent",
  },
];

const schema = yup.object().shape({
  user: yup.string().required("User is required"),
  finance: yup.string().required("Finance is required"),
  account_number: yup
    .string()
    .max(20, "Account number must be at most 20 characters")
    .required("Account number is required"),
  total_loan: yup
    .number()
    .positive("Total loan must be a positive number")
    .max(99999999.99, "Total loan must be at most 99,999,999.99")
    .required("Total loan is required"),
  total_paid: yup
    .number()
    .positive("Total paid must be a positive number")
    .max(99999999.99, "Total paid must be at most 99,999,999.99")
    .required("Total paid is required"),
  loan_limit: yup
    .number()
    .positive("Loan limit must be a positive number")
    .max(99999999.99, "Loan limit must be at most 99,999,999.99")
    .default(() => yup.ref("total_loan")),
  interest_rate: yup
    .number()
    .positive("Interest rate must be a positive number")
    .max(100.0, "Interest rate must be at most 100.00")
    .required("Interest rate is required"),
  overdue_amount: yup
    .number()
    .positive("Overdue amount must be a positive number")
    .max(99999999.99, "Overdue amount must be at most 99,999,999.99")
    .default(0.0),
  status: yup
    .string()
    .oneOf(
      ["good", "watchlist", "pass", "npl", "doubtful", "bad debt"],
      "Invalid status"
    )
    .default("good"),
  loan_type: yup
    .string()
    .oneOf(["term", "overdraft"], "Invalid loan type")
    .default("term"),
  is_closed: yup.boolean().default(false),
  utilization_percent: yup
    .number()
    .positive("Utilization percent must be a positive number")
    .max(100.0, "Utilization percent must be at most 100.00")
    .nullable(true),
});

const title = "Create Loan Account";
const endpoint = "cooperative/loans";

const handleUsersResponse = (data) => {
  const users = data.map((item) => {
    return {
      label: item.first_name,
      value: item.idx,
    };
  });
  return users;
};

const handleFinancesResponse = (data) => {
  const finances = data.map((item) => {
    return {
      label: item.name,
      value: item.idx,
    };
  });
  return finances;
};

const LoanAccountForm = () => {
  const { loading: loadingUsers, data: users } = useFetch({
    url: `${mainUrl}/auth/users`,
    responseHandler: handleUsersResponse,
  });
  const { loading: loadingFinances, data: finances } = useFetch({
    url: `${mainUrl}/cooperative/finance`,
    responseHandler: handleFinancesResponse,
  });
  if (users) {
    fields = fields.map((item) => {
      if (item.name === "user") {
        item.options = users.data;
      }
      return item;
    });
  }

  if (finances) {
    fields = fields.map((item) => {
      if (item.name === "finance") {
        item.options = finances.data;
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
      loading={loadingUsers || loadingFinances}
    />
  );
};

export default LoanAccountForm;
