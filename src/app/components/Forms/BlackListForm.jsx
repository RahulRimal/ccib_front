import React, { useEffect, useState } from 'react'
import BaseForm from './BaseForm'
import useFetch from '../../custom_hooks/useFetch';
import { mainUrl } from '../../constants';
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
        label: "Category",
        name: "category",
        type: "select",
        options: [
            { value: "borrower", label: "Borrower" },
            { value: "guarantor", label: "Guarantor" },
        ],
        required: true,
        defaultValue: "borrower",
        placeholder: "Select Category",
    },
    {
        label: "Reason",
        name: "reason",
        type: "text",
        required: true,
        defaultValue: "",
        placeholder: "Enter Reason",
    },
    {
        label: "Remarks",
        name: "remarks",
        type: "textarea",
        required: false,
        defaultValue: "",
        placeholder: "Enter Remarks",
    },
    {
        label: "Status",
        name: "status",
        type: "select",
        options: [
            { value: "blacklisted", label: "Blacklisted" },
            { value: "relished", label: "Relished" },
        ],
        required: true,
        defaultValue: "blacklisted",
        placeholder: "Select Status",
    },
    {
        label: "Release Date",
        name: "release_date",
        type: "date",
        required: false,
        defaultValue: "",
        placeholder: "Select Release Date",
    },
    {
        label: "Report Date",
        name: "report_date",
        type: "date",
        required: true,
        defaultValue: "",
        placeholder: "Select Report Date",
    },
];



 const schema = yup.object().shape({
  user: yup.string().required("User is required"),
  finance: yup.string().required("Finance is required"),
  category: yup
    .string()
    .oneOf(["borrower", "guarantor"], "Invalid category")
    .required("Category is required"),
  reason: yup
    .string()
    .max(500, "Reason cannot exceed 500 characters")
    .required("Reason is required"),
  remarks: yup.string(),
  status: yup
    .string()
    .oneOf(["blacklisted", "relished"], "Invalid status")
    .required("Status is required"),
  release_date: yup.date(),
  report_date: yup.date().required("Report date is required"),
})


const title = "Blacklist";
const endpoint = "cooperative/blacklist";


const handleUsersResponse = (data) => {
    const users = data.map((item) => {
        return {
            label: item.first_name,
            value: item.idx,
        };
    })
    return users
}

const handleFinancesResponse = (data) => {
    const finances = data.map((item) => {
        return {
            label: item.name,
            value: item.idx,
        };
    })
    return finances
}

const BlackListForm = () => {

    const { loading: loadingUsers, data: users } = useFetch({ url: `${mainUrl}/auth/users`, responseHandler: handleUsersResponse });
    const { loading: loadingFinances, data: finances } = useFetch({ url: `${mainUrl}/cooperative/finance`, responseHandler: handleFinancesResponse });
    if (users) {
        fields = fields.map((item) => {
            if (item.name === "user") {
                item.options = users.data;
            }
            return item;
        })
    }

    if (finances) {
        fields = fields.map((item) => {
            if (item.name === "finance") {
                item.options = finances.data;
            }
            return item;
        })
    }

    return (
        <BaseForm title={title} fields={fields} schema={schema} endpoint={endpoint} loading={loadingUsers || loadingFinances} />
    )
}

export default BlackListForm
