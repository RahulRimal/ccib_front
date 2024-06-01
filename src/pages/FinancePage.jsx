import React, { useMemo } from "react";
import useFetchTable from "../custom_hooks/useFetchTable";
import { mainUrl } from "../constants";
import BaseTable from "../components/Tables/BaseTable";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "styled-components";

const FinancePage = () => {
  const theme = useTheme();

  const handleResponce = (data) => {
    return data.map((item) => {
      const { name: locationName } = item.location;
      return {
        ...item,
        financeName: item.name,
        locationName,
      };
    });
  };

  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/finance/`,
    columnsToHide: ["idx", "location", "name"],
    responseHandler: handleResponce,
  });
  const data = useMemo(() => rowData, [rowData]);

  return (
    <div>
      <BaseTable isLoading={loading} data={data} columns={columns} />
    </div>
  );
};

export default FinancePage;
