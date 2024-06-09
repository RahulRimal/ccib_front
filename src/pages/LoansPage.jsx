import React, { useMemo } from "react";
import useFetchTable from "../custom_hooks/useFetchTable";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "styled-components";

const LoansPage = () => {
  const theme = useTheme();
  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/loans/`,
    columnsToHide: ["idx"],
  });

  const data = useMemo(() => rowData, [rowData]);

  return (
    <div>
      <BaseTable isLoading={loading} data={data} columns={columns} />
    </div>
  );
};

export default LoansPage;
