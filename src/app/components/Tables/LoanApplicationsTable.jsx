import React, { useContext } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { DrawerWidthContext } from "../../App";
import BaseTable from "./BaseTable";
import { humanizeString } from "../../helpers";
import useFetchTable from "../../custom_hooks/useFetchTable";
import { mainUrl } from "../../constants";
import { flexRender } from "@tanstack/react-table";
import { useTheme } from "styled-components";

const LoanApplicationsTable = () => {
  const { drawerWidth } = useContext(DrawerWidthContext);
  const theme = useTheme();
  const columnsToHide = ["idx"];

  const loanApplicationsFromJson = (json) => {
    return json.map((item) => {
      const returnData = {
        finance: item.finance.name,
        idx: item.idx,
        amount: item.loan_amount,
        user: `${item.user.first_name} ${
          item.user.middle_name !== null ? item.user.middle_name : ""
        } ${item.user.last_name}`,
        status: item.status,
      };
      return Object.fromEntries(
        Object.entries(returnData).filter(([_, v]) => v != null)
      );
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

  const { rowData, columns, loading } = useFetchTable({
    url: `${mainUrl}/cooperative/loanapplications/`,
    columnsToHide,
    responseHandler: loanApplicationsFromJson,
    customRenderer: customRenderer,
  });

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <ClipLoader />
      </div>
    );
  } else {
    return (
      <>
        <BaseTable
          data={rowData}
          columns={columns}
          customRenderer={customRenderer}
        />
      </>
    );
  }
};

export default LoanApplicationsTable;
// {customRenderer ? customRenderer(cell) : flexRender(cell.column.columnDef.cell, cell.getContext())}
