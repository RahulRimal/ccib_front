import React, { useEffect, useState } from 'react'
import BaseForm from './BaseForm'
import useFetch from '../../custom_hooks/useFetch';
import { mainUrl } from '../../constants';
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
  loan: yup.number().required("Loan is required"),
  type: yup
    .string()
    .oneOf(["real state", "fixed asset", "higher purchase"], "Invalid type")
    .required("Type is required"),
  description: yup.string().required("Description is required"),
  ownership_type: yup
    .string()
    .oneOf(["own", "third party"], "Invalid ownership type")
    .required("Ownership type is required"),
  coverage_percentage: yup
    .number()
    .min(0, "Coverage percentage must be at least 0")
    .max(100, "Coverage percentage must be at most 100")
    .required("Coverage percentage is required"),
  latest_value: yup
    .number()
    .min(0, "Latest value must be a positive number")
    .required("Latest value is required"),
  latest_valuation_date: yup
    .date()
    .required("Latest valuation date is required"),
});

const title = "Security Deposit";
const endpoint = "cooperative/security-deposit";



const handleResponse = (data) => {
    data = data.map((item) => {
        return {
            label: item.idx,
            value: item.idx,
        };
    })
    return data
}

const SecurityDepositForm = () => {

    const { loading, data } = useFetch({ url: `${mainUrl}/cooperative/loans/`, responseHandler: handleResponse });
    if (data) {
        fields = fields.map((item) => {
            if (item.name === "loan") {
                item.options = data.data;
            }
            return item;
        })
    }
    return (
        <BaseForm title={title} fields={fields} schema={schema} endpoint={endpoint} loading={loading} />
    )
}

export default SecurityDepositForm
