import React, { useEffect, useState } from "react";
import BaseForm from "./BaseForm";
import useFetch from "../../custom_hooks/useFetch";
import { mainUrl } from "../../constants";
import * as yup from "yup";

let fields = [
  {
    label: "Loan Amount",
    name: "loan_amount",
    type: "number",
    step: "0.01",
    required: true,
    defaultValue: 0.0,
    placeholder: "Enter Loan Amount",
  },
  {
    label: "Finance",
    name: "finance",
    type: "select",
    required: true,
    defaultValue: "",
    placeholder: "Enter Finance ID",
  },
  {
    label: "Status",
    name: "status",
    type: "select",
    options: [
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
    ],
    required: true,
    defaultValue: "pending",
  },
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Enter First Name",
    defaultValue: "",
  },
  {
    name: "middle_name",
    label: "Middle Name",
    type: "text",
    required: false,
    placeholder: "Enter Middle Name",
    defaultValue: "",
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Enter Last Name",
    defaultValue: "",
  },
  {
    name: "citizenship_number",
    label: "Citizenship Number",
    type: "text",
    required: true,
    defaultValue: "",
    placeholder: "Enter Citizenship Number",
  },
  {
    name: "citizenship_issued_place",
    label: "Citizenship Issued Place",
    type: "text",
    required: true,
    defaultValue: "",
    placeholder: "Enter CitizenShip Issued Place",
  },
  {
    name: "citizenship_issued_date",
    label: "Citizenship Issued Date",
    type: "date",
    required: true,
    defaultValue: "",
    placeholder: "Enter CitizenShip Issued Date",
  },
  // {
  //   name: "gender",
  //   label: "Gender",
  //   type: "select",
  //   required: true,
  //   options: ["male", "female"],
  // },
  // { name: "dob", label: "Date of Birth", type: "date", required: false },
  {
    name: "father_name",
    label: "Father Name",
    type: "text",
    required: true,
    defaultValue: "",
    placeholder: "Enter Father Name",
  },

  {
    name: "phone_number",
    label: "Phone Number",
    type: "number",
    required: true,
    defaultValue: "",
    placeholder: "Enter Phone Number",
  },
];

const schema = yup.object().shape({
  loan_amount: yup
    .number()
    .required("Loan amount is required")
    .min(0, "Loan amount must be a positive number")
    .typeError("Loan amount must be a number"),
  finance: yup.string().required("Finance ID is required"),
  status: yup
    .string()
    .oneOf(["pending", "approved", "rejected"])
    .required("Status is required"),
  first_name: yup.string().required("First name is required"),
  middle_name: yup.string(),
  last_name: yup.string().required("Last name is required"),
  citizenship_number: yup.string().required("Citizenship number is required"),
  citizenship_issued_place: yup
    .string()
    .required("Citizenship issued place is required"),
  citizenship_issued_date: yup
    .date()
    .required("Citizenship issued date is required"),
  father_name: yup.string().required("Father name is required"),
  phone_number: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .nullable(),
  loan_amount: yup.string().required("Loan amount is required"),
  finance: yup.number().required("Finance is required"),
  status: yup
    .string()
    .oneOf(["pending", "approved", "rejected"], "Invalid status")
    .required("Status is required"),
});
const title = "Loan Application";
const endpoint = "cooperative/loanapplications";

const handleResponse = (data) => {
  data = data.map((item) => {
    return {
      label: item.idx,
      value: item.idx,
    };
  });
  return data;
};
const LoanApplicationForm = () => {
  const { loading, data } = useFetch({
    url: `${mainUrl}/cooperative/finance/`,
    responseHandler: handleResponse,
  });
  if (data) {
    fields = fields.map((item) => {
      if (item.name === "finance") {
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
    />
  );
};

export default LoanApplicationForm;
