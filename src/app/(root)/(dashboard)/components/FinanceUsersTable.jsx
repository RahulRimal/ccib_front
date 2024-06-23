import BaseTable from "@/app/components/Tables/BaseTable";
import { mainUrl } from "@/app/constants";
import useFetchTable from "@/custom_hooks/useFetchTable";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "vVqFP@example.com",
    status: "Active",
    amount: 1000,
    dob: "10/10/2021",
    phone_number: 1234567890,
    address: "123 Main St, Anytown, USA",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "vVqFP@example.com",
    status: "Active",
    amount: 1000,
    dob: "10/10/2021",
    phone_number: 1234567890,
    address: "123 Main St, Anytown, USA",
  },
  {
    id: 3,
    name: "John Doe",
    email: "vVqFP@example.com",
    status: "Active",
    amount: 1000,
    dob: "10/10/2021",
    phone_number: 1234567890,
    address: "123 Main St, Anytown, USA",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "vVqFP@example.com",
    status: "Active",
    amount: 1000,
    dob: "10/10/2021",
    phone_number: 1234567890,
    address: "123 Main St, Anytown, USA",
  },
];

const FinanceUsersTable = () => {

  const { loading, rowData, columns } = useFetchTable({
    // url: `${mainUrl}/auth/users/?loans__finance__idx=36MHASzorqBBdKP2CccsYm`,
    url: `${mainUrl}/cooperative/financeusers/`,
    // columnsToHide: ["idx"],
  });
  return (
    <>
      <BaseTable
        isLoading={loading}
        data={rowData}
        columns={columns}
        title={"Consumers Table"}
      />
    </>
  );
};

export default FinanceUsersTable;
