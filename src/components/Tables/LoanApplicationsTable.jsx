import React, { useContext } from 'react'
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { DrawerWidthContext } from "../../App";
import BaseTable from './BaseTable';
import { humanizeString } from '../../helpers';


const LoanApplicationsTable = () => {
    const { drawerWidth } = useContext(DrawerWidthContext);
    const [applications, setApplications] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const columnsToHide = ["idx"]

    React.useEffect(() => {
        const fetchLoanApplications = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3001/applications/");
                if (response.status === 200) {
                    const loanApplications = loanApplicationsFromJson(response.data)
                    setApplications(loanApplications);

                    let cols = Object.keys(loanApplications[0]);
                    cols = cols.map((item) => ({
                        header: humanizeString(item),
                        accessorKey: item
                    }));
                    
                    cols = [
                        ...cols,
                        {
                            header: "Status",
                            accessorKey: "status"
                        }

                    ]
                    cols = cols.filter((item) => !columnsToHide.includes(item.accessorKey));

                    setColumns(cols);
                    setLoading(false);
                }
                if (response.status === 400) {
                    console.log("axios error");
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }

        }

        fetchLoanApplications()
    }, [])

    const loanApplicationsFromJson = (json) => {

        return json.map((item) => {
            const returnData = {
                finance: item.finance.name,
                idx: item.idx,
                amount: item.loan_amount,
                status: item.status,
            }
            return Object.fromEntries(Object.entries(returnData).filter(([_, v]) => v != null));
        });
    }

    if (loading) {
        return (
            <div style={{ textAlign: "center" }}>
                <ClipLoader />
            </div>

        );
    }
    else {
        return (
            <>
                <BaseTable data={applications} columns={columns} />

                {/* {
                    applications.length > 0 ?
                        <Table title={"Loan Applications"} tableWidth={ drawerWidth} renderData={applications} /> : null
                } */}
            </>
        )
    }
}

export default LoanApplicationsTable