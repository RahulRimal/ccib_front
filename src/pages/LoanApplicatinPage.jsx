import React, { useMemo } from "react";
import useFetchTable from "../custom_hooks/useFetchTable";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "styled-components";

const LoanApplicationPage = () => {
  const theme = useTheme();

  const handleResponse = (data) => {
    return data.map((item) => {
      const { username, first_name, middle_name, last_name, phone_number } =
        item.user;
      return {
        ...item,
        username,
        name: `${first_name} ${middle_name} ${last_name}`,
        phone_number,
      };
    });
  }; 

  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/loanapplications/`,
    columnsToHide: ["idx", "user"],
    responseHandler: handleResponse,
  });

  const data = useMemo(() => rowData, [rowData]);

  return (
    <div style={{ margin: theme.spacing.s20 }}>
      <BaseTable isLoading={loading} data={data} columns={columns} />
    </div>
  );
};

export default LoanApplicationPage;
