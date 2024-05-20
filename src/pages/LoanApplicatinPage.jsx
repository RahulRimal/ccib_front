import React, { useMemo } from "react";
import useFetchTable from "../custom_hooks/useFetchTable";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "styled-components";
import { getFullName, humanizeString } from "../helpers";

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

  const data = useMemo(() => rowData, [rowData]);

  return (
    <div style={{ margin: theme.spacing.s20 }}>
      <BaseTable
        isLoading={loading}
        data={data}
        columns={columns}
        customRenderer={customRenderer}
      />
    </div>
  );
};

export default LoanApplicationPage;
