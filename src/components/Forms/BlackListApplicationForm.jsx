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
        placeholder: "Enter User ID",
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
        label: "Reason",
        name: "reason",
        type: "textarea",
        required: true,
        defaultValue: "",
        maxLength: 500,
        placeholder: "Enter Reason",
    },
    {
        label: "Inquirer",
        name: "inquirer",
        type: "text",
        required: true,
        defaultValue: "",
        placeholder: "Enter Inquirer User ID",
    },
];

const schema = yup.object().shape({
    user: yup.string().required("User ID is required"),
    finance: yup.string().required("Finance ID is required"),
    reason: yup
        .string()
        .min(5, "Reason must be at least 5 characters")
        .max(500, "Reason can't be more than 500 characters")
        .required("Reason is required"),
    inquirer: yup.string().required("Inquirer User ID is required"),
});

const title = "Inquiry";
const endpoint = "cooperative/inquiries";


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

const BlackListApplicationForm = () => {


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

export default BlackListApplicationForm
