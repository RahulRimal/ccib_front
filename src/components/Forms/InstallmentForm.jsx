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
  loan: yup.number().required("Loan is required"),
  due_date: yup
    .date()
    .required("Due date is required")
    .typeError("Invalid date format"),
  paid_date: yup
    .date()
    .required("Paid date is required")
    .typeError("Invalid date format"),
  total_due: yup
    .number()
    .positive("Total due must be a positive number")
    .required("Total due is required"),
  total_paid: yup
    .number()
    .positive("Total paid must be a positive number")
    .required("Total paid is required"),
  total_outstanding: yup
    .number()
    .positive("Total outstanding must be a positive number")
    .required("Total outstanding is required"),
});

const title = "Installment";
const endpoint = "cooperative/installments";


const handleResponse = (data) => {
    data = data.map((item) => {
        return {
            label: item.idx,
            value: item.idx,
        };
    })
    return data
}

const InstallmentForm = () => {

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

export default InstallmentForm
