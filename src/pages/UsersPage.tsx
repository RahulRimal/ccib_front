import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import BaseTable from "../components/Tables/BaseTable";
import * as yup from "yup";
import { mainUrl } from "../constants";
import useFetchTable from "../custom_hooks/useFetchTable";
import apiService from "../api_service";
import { User } from "../models/cooperative";
import { AdvanceFilter } from "../models/misc";
import { ColumnDef } from "@tanstack/react-table";

const Wrapper = styled.main``;

let filterFields: AdvanceFilter[] = [
  {
    title: "Fields",
    inputs: [
      {
        label: "First name",
        name: "first_name",
        type: "text",
        required: false,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter first name.",
      },
      {
        label: "Last name",
        name: "last_name",
        type: "text",
        required: false,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter last name.",
      },
      {
        label: "Phone No.",
        name: "phone_number",
        type: "number",
        required: false,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter phone number.",
      },
      {
        label: "Loan account no.",
        name: "loans_account_number",
        type: "text",
        required: false,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter account no.",
      },
      {
        label: "Loan finance idx.",
        name: "loans_finance_idx",
        type: "text",
        required: false,
        basis: 30,
        options: [],
        defaultValue: "",
        placeholder: "Enter finance idx.",
      },
    ],
  },
];

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone_number: yup.string().required("Phone number is required"),
  loans_account_number: yup
    .string()
    .required("Loan account number is required"),
  loans_finance_idx: yup.string().required("Loan finance idx is required"),
});

const UsersTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);

  const url = `${mainUrl}/cooperative/financeusers/`;

  const { loading, rowData, columns } = useFetchTable<User>({
    url: url,
    columnsToHide: ["id", "idx", "username"],
  });

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  return (
    <div>
      <BaseTable
        title="Users list"
        rows={data}
        columns={columns as ColumnDef<User, string | number | undefined>[]}
        loading={loading}
        tableLoading={tableLoading}
        filterFields={filterFields}
        onFilter={(data: Record<string, any>) =>
          apiService.filterTable(data, url, setData, setTableLoading)
        }
        onReset={() => setData(rowData)}
        validationSchema={schema}
        toolbarActions={
          <Button
            icon={<AiOutlinePlus />}
            text="Add User"
            onClick={() => navigate("/add/users")}
          />
        }
        navigateOnRowClick={(data: User) => navigate(`/users/${data.idx}`)}
        height={""}
      />
    </div>
  );
};

const UsersPage = ({}) => {
  return (
    <Wrapper>
      <UsersTable />
    </Wrapper>
  );
};

export default UsersPage;
