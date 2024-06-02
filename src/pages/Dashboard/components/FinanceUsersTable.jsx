import BaseTable from "../../../components/Tables/BaseTable";
import { mainUrl } from "../../../constants";
import useFetchTable from "../../../custom_hooks/useFetchTable";


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
/*     const columns = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "amount",
            header: "Amount",
        },
        {
            accessorKey: "dob",
            header: "Date of Birth",
        },
        {
            accessorKey: "phone_number",
            header: "Phone Number",
        },
    ]; */


    const { loading, rowData, columns } = useFetchTable({
        url: `${mainUrl}/auth/users/?loans__finance__idx=36MHASzorqBBdKP2CccsYm`,
        columnsToHide: ["idx", "username"],
    })
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