import React, { useEffect, useMemo, useState } from "react";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";

import { useTheme } from "styled-components";
import { getFullName, humanizeString } from "../helpers";
import useFetch from "../custom_hooks/useFetch";
import * as yup from "yup";
import useFetchTable from "../custom_hooks/useFetchTable";
import apiService from "../api_service";
import { AdvanceFilter } from "../models/misc";
import { Finance, User } from "../models/cooperative";
import LoanApplication from "../models/LoanApplication";

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
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
        ],
        required: false,
        defaultValue: "pending",
      },
      {
        label: "Finance",
        name: "finance",

        type: "select",
        required: false,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter Finance ID",
      },
      {
        label: "User",
        name: "user",
        type: "select",
        required: false,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter User ID",
      },
    ],
  },
];

const schema = yup.object().shape({
  user: yup.string().required("User is required"),
  finance: yup.string().required("Finance is required"),
  status: yup.string().required("Status is required"),
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
const handleFinancesResponse = (data: Finance[]) => {
  const finances = data.map((item) => {
    return {
      label: item.name,
      value: item.idx,
    };
  });
  return finances;
};

const handleResponse = (data: LoanApplication[]) => {
  return data.map((item) => {
    const { first_name, middle_name, last_name, phone_number } = item.user;
    return {
      ...item,
      user: getFullName({ first_name, middle_name, last_name }),
      phone_number,
      finance: item.finance.name,
    };
  });
};

const LoanApplicationPage = () => {
  const theme = useTheme();

  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState<LoanApplication[]>([]);

  const url = `${mainUrl}/cooperative/loanapplications/`;

  const customRenderer: Record<
    string,
    (info: { getValue: () => string }) => JSX.Element
  > = {
    status: (info) => {
      const colors: Record<string, string> = {
        pending: theme.palette.warning.main,
        approved: theme.palette.success.main,
        rejected: theme.palette.error.main,
      };
      const value = info.getValue();
      return (
        <p style={{ color: colors[value] }}>
          {humanizeString(info.getValue())}
        </p>
      );
    },
  };

  const { loading, rowData, columns } = useFetchTable<LoanApplication>({
    url: url,
    columnsToHide: ["idx", "phone_number"],
    customRenderer,
    responseHandler: handleResponse,
  });

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  //filter
  const { loading: loadingUsers, data: users } = useFetch({
    url: `${mainUrl}/cooperative/financeusers/`,
    responseHandler: handleUsersResponse,
  });

  const { loading: loadingFinances, data: finances } = useFetch({
    url: `${mainUrl}/cooperative/finance/`,
    responseHandler: handleFinancesResponse,
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
  if (finances) {
    filterFields.map((item) => {
      item.inputs.map((input) => {
        if (input.name === "finance") {
          input.options = finances.data;
        }
        return input;
      });
      return item;
    });
  }

  return (
    <div>
      <BaseTable
        rows={data}
        columns={columns}
        loading={loading}
        tableLoading={tableLoading}
        filterFields={filterFields}
        onFilter={(data: LoanApplication[]) =>
          apiService.filterTable(data, url, setData, setTableLoading, {
            responseHandler: handleResponse as any,
          })
        }
        noDataMessage={"No Loan Applications"}
        validationSchema={schema}
        height={""}
        title={""}
        toolbarActions={() => null}
        navigateOnRowClick={false}
      />
    </div>
  );
};

export default LoanApplicationPage;
