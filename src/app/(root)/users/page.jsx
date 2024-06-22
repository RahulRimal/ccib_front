"use client";
import Button from "@/app/components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import BaseTable from "@/app/components/Tables/BaseTable";
import * as yup from "yup";
import { mainUrl } from "@/app/constants";
import useFetchTable from "@/custom_hooks/useFetchTable";
import { useRouter } from "next/navigation";

let filterFields = [
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
  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/financeusers/`,
    columnsToHide: ["id", "idx", "username"],
  });
  const router = useRouter();

  return (
    <div>
      <BaseTable
        title="Users list"
        url={`${mainUrl}/cooperative/financeusers/`}
        columnsToHide={["id", "idx", "username"]}
        filterFields={filterFields}
        validationSchema={schema}
        toolbarActions={
          <Button
            icon={<AiOutlinePlus />}
            text="Add User"
            onClick={() => router.push("application")}
          />
        }
        navigateOnRowClick={(data) => router.push(`/users/${data.idx}`)}
      />
    </div>
  );
};

const UsersPage = ({}) => {
  return (
    <div>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
