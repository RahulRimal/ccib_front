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
    required: true,
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
    .required("Account Number is required")
    .max(20, "Account Number must be at most 20 characters"),
  name: yup
    .string()
    .required("Loan Name is required")
    .min(3, "Loan Name must be at least 2 characters")
    .max(20, "Loan Name must be at most 20 characters"),
  loan_amount: yup
    .number()
    .typeError("Required")
    .required("Loan Amount is required")
    .positive("Loan Amount must be a positive number"),
  installment_amount: yup
    .number()
    .typeError("Required")
    .required("Installment Amount is required")
    .positive("Installment Amount must be a positive number"),
  total_paid: yup
    .number()
    .typeError("Required")
    .required("Total Paid is required")
    .positive("Total Paid must be a positive number"),
  loan_outstanding: yup
    .number()
    .typeError("Required")
    .required("Loan Outstanding is required")
    .positive("Loan Outstanding must be a positive number"),
  loan_limit: yup
    .number()
    .typeError("Required")
    .positive("Loan Limit must be a positive number"),
  interest_rate: yup
    .number()
    .typeError("Required")
    .required("Interest Rate is required")
    .positive("Interest Rate must be a positive number")
    .max(100, "Interest Rate must be at most 100.00"),
  overdue_amount: yup
    .number()
    .typeError("Required")
    .positive("Overdue Amount must be a positive number"),
  maturity_date: yup
    .date()
    .typeError("Maturity Date must be a valid date")
    .required("Maturity Date is required"),
  status: yup.string().required("Status is required"),
  loan_type: yup.string(),
  is_closed: yup.boolean().required("Is Closed is required"),
  utilization_percent: yup
    .number()
    .typeError("Required")
    .required("Utilization Percent is required")
    .positive("Utilization Percent must be a positive number"),
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
