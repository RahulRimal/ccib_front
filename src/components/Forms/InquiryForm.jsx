import React, { useEffect, useState } from 'react'
import BaseForm from './BaseForm'
import useFetch from '../../custom_hooks/useFetch';
import { mainUrl } from '../../constants';

const InquiryForm = ({ fieldInfo }) => {
    let { title, fields, schema, endpoint } = fieldInfo;

    const { data } = useFetch({ url: `${mainUrl}/auth/users` });
    const { data: finance } = useFetch({ url: `${mainUrl}/cooperative/finance` })


    const getUsers = () => {
        if (data) {
            const options = data.map((item) => {
                return {
                    label: item.first_name,
                    value: item.idx,
                };
            });
            fields = fields.map((item) => {
                if (item.name === "user") {
                    item.options = options;
                }
                return item;
            })

        }
    };
    const getFinances = () => {
        if (finance) {
            const options = finance.map((item) => {
                return {
                    label: item.name,
                    value: item.idx,
                };
            });
            fields = fields.map((item) => {
                if (item.name === "finance") {
                    item.options = options;
                }
                return item;
            })
        }
    };

    useEffect(() => {
        getUsers();
        getFinances();
    }, [])

    return (
        <BaseForm title={title} fields={fields} schema={schema} endpoint={endpoint} />
    )
}

export default InquiryForm


