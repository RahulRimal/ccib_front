import React, { useEffect, useMemo, useState } from "react";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import { useTheme } from "styled-components";
import useFetch from "../custom_hooks/useFetch";
import * as yup from "yup";
import { getFullName } from "../helpers";
import apiService from "../api_service";
import useFetchTable from "../custom_hooks/useFetchTable";
import { AdvanceFilter } from "../models/misc";
import { Loan, User } from "../models/cooperative";

let filterFields: AdvanceFilter[] = [
  {
    title: "Fields",
    inputs: [
      {
        label: "Status",
        name: "status",
        type: "select",
        basis: 30,
        options: [
          { value: "good", label: "Good" },
          { value: "watchlist", label: "Watchlist" },
          { value: "pass", label: "pass" },
          { value: "npl", label: "Npl" },
          { value: "doubtful", label: "Doubtful" },
          { value: "bad debt", label: "Bad Debt" },
        ],
        required: false,
        defaultValue: "pending",
      },
      {
        label: "Account number",
        name: "account_number",
        type: "number",
        required: false,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter account no.",
      },
      {
        label: "Users",
        name: "user",
        type: "select",
        required: false,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter User ID",
      },
      {
        label: "Loan nature",
        name: "loan_nature",
        type: "select",
        required: false,
        basis: 30,
        options: [
          { value: "term", label: "Term" },
          { value: "overdraft", label: "Overdraft" },
        ],
        defaultValue: "",
        placeholder: "Enter Loan Nature",
      },
    ],
  },
];

const schema = yup.object().shape({
  status: yup.string().required("Status is required"),
  account_number: yup
    .string()
    .required("Account number is required")
    .nullable()
    .test(
      "account-number-test",
      "Account number must be at least 10 characters",
      function (value) {
        return !value || value.length >= 10;
      }
    ),
  user: yup.string().required("User is required"),
  loan_nature: yup
    .string()
    .oneOf(["term", "overdraft"], "Invalid loan nature")
    .required("Loan nature is required"),
});

const handleUsersResponse = (data: User[]) => {
  const users = data.map((item) => {
    return {
      label: item.first_name,
      value: item.idx,
    };
  });
  return users;
};
const handleResponse = (data: Loan[]) => {
  return data.map((item) => {
    const { first_name, middle_name, last_name } = item.user;
    return {
      ...item,
      user: getFullName({ first_name, middle_name, last_name }),
      finance: item.finance.name,
    };
  });
};

const LoansPage = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState<Loan[]>([]);

  const theme = useTheme();
  const url = `${mainUrl}/cooperative/loans/`;

  const { loading, rowData, columns } = useFetchTable<Loan>({
    url: url,
    responseHandler: handleResponse,
    columnsToHide: ["idx"],
  });

  //filter
  const { loading: loadingUsers, data: users } = useFetch({
    url: `${mainUrl}/cooperative/financeusers`,
    responseHandler: handleUsersResponse,
  });

  if (users) {
    filterFields = filterFields.map((item) => {
      item.inputs.map((input) => {
        if (input.name === "user") {
          input.options = users.data;
        }
        return input;
      });
      return item;
    });
  }
  //filter

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  return (
    <div>
      <BaseTable
        rows={data}
        columns={columns}
        filterFields={filterFields}
        onFilter={(data: Record<string, any>) => {
          apiService.filterTable(data, url, setData, setTableLoading, {
            responseHandler: handleResponse as any,
          });
        }}
        loading={loading}
        noDataMessage={"No loans found"}
        validationSchema={schema}
        tableLoading={tableLoading}
      />
    </div>
  );
};

export default LoansPage;
