import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import BaseTable from "../components/Tables/BaseTable";
import axios from "axios";
import { humanizeString } from "../helpers";
import { DrawerWidthContext } from "../App";
import UserCreditHistoryChart from "../components/Charts/UserCreditHistory";
import { mainUrl } from "../constants";
import useFetchTable from "../custom_hooks/useFetchTable";
import UserDetailsTable from "../components/Tables/UserDetailsTable";

//Sizing system (px)// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.main``;

const UsersTable = () => {
  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/auth/users/`,
    columnsToHide: ["id", "idx"],
  });
  const theme = useTheme();
  const data = useMemo(() => rowData, [rowData]);
  const navigate = useNavigate();

  return (
    <div style={{ margin: theme.spacing.s20 }}>
      <BaseTable
        title="Users list"
        isLoading={loading}
        data={data}
        columns={columns}
        toolbarActions={
          <Button
            icon={<AiOutlinePlus />}
            text="Add User"
            onClick={() => navigate("application")}
          />
        }
        navigateOnRowClick={(data) => navigate(`/users/${data.idx}`)}
      />
    </div>
  );
};

const Home = ({}) => {
  return (
    <Wrapper>
      <UsersTable />
      <UserDetailsTable />
    </Wrapper>
  );
};

export default Home;
