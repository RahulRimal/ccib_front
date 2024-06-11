import React, { useMemo } from "react";
import useFetchTable from "../custom_hooks/useFetchTable";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "styled-components";
import { getFullName, humanizeString } from "../helpers";
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
        label: "Finance",
        name: "finance",
        type: "select",
        required: true,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter Finance ID",
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
const handleFinancesResponse = (data) => {
  const finances = data.map((item) => {
    return {
      label: item.name,
      value: item.idx,
    };
  });
  return finances;
};

const LoanApplicationPage = () => {
  const theme = useTheme();

  const handleResponse = (data) => {
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

  const customRenderer = {
    status: (info) => {
      const colors = {
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

  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/loanapplications/`,
    columnsToHide: ["idx", "phone_number"],
    responseHandler: handleResponse,
    customRenderer: customRenderer,
  });

  //filter
  const { loading: loadingUsers, data: users } = useFetch({
    url: `${mainUrl}/auth/users`,
    responseHandler: handleUsersResponse,
  });

  const { loading: loadingFinances, data: finances } = useFetch({
    url: `${mainUrl}/cooperative/finance`,
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
        customRenderer={customRenderer}
        filterFields={filterFields}
        loading={loadingUsers || loadingFinances}
      />
    </div>
  );
};

export default LoanApplicationPage;
