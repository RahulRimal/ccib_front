import React, { useMemo } from "react";
import useFetchTable from "../custom_hooks/useFetchTable";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "styled-components";
import useFetch from "../custom_hooks/useFetch";

let filterFields = [
  {
    title: "Fields",
    inputs: [
      {
        label: "Status",
        name: "status",
        type: "select",
        basis: 30,
        options: [
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
        ],
        required: true,
        defaultValue: "pending",
      },
      {
        label: "Account number",
        name: "account_number",
        type: "text",
        required: true,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter account no.",
      },
      {
        label: "Users",
        name: "user",
        type: "select",
        required: true,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter User ID",
      },
      {
        label: "Loan nature",
        name: "loan_nature",
        type: "select",
        required: true,
        basis: 30,
        options: [
          { value: "term", label: "Term" },
          { value: "overdraft", label: "Overdraft" },
        ],
        defaultValue: "",
        placeholder: "Enter account no.",
      },
    ],
  },
];

const handleUsersResponse = (data) => {
  const finances = data.map((item) => {
    return {
      label: item.first_name,
      value: item.idx,
    };
  });
  return finances;
};

const LoansPage = () => {
  const theme = useTheme();
  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/loans/`,
    columnsToHide: ["idx"],
  });

  //filter
  const { loading: loadingUsers, data: users } = useFetch({
    url: `${mainUrl}/auth/users`,
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

  const data = useMemo(() => rowData, [rowData]);

  return (
    <div>
      <BaseTable
        isLoading={loading}
        data={data}
        columns={columns}
        filterFields={filterFields}
        loading={loadingUsers}
      />
    </div>
  );
};

export default LoansPage;
