import React, { useMemo } from "react";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import { useTheme } from "styled-components";
import useFetch from "../custom_hooks/useFetch";
import * as yup from "yup";
import { getFullName } from "../helpers";

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
  status: yup.string(),
  account_number: yup
    .string()
    .nullable()
    .test(
      "account-number-test",
      "Account number must be at least 10 characters",
      function (value) {
        return !value || (value && value.length >= 10);
      }
    ),
  user: yup.string(),
  loan_nature: yup.string().oneOf(["term", "overdraft"], "Invalid loan nature"),
});

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

  const handleResponse = (data) => {
    return data.map((item) => {
      const { first_name, middle_name, last_name } = item.user;
      return {
        ...item,
        user: getFullName({ first_name, middle_name, last_name }),
        finance: item.finance.name,
      };
    });
  };

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

  return (
    <div>
      <BaseTable
        url={`${mainUrl}/cooperative/loans/`}
        columnsToHide={["idx"]}
        filterFields={filterFields}
        loading={loadingUsers}
        noDataMessage={"No loans found"}
        validationSchema={schema}
        handleResponse={handleResponse}
      />
    </div>
  );
};

export default LoansPage;
