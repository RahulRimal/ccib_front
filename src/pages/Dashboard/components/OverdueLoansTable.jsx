import React from 'react'
import BaseTable from '../../../components/Tables/BaseTable';
import useFetchTable from '../../../custom_hooks/useFetchTable';
import { mainUrl } from '../../../constants';
import { useTheme } from 'styled-components';
import { humanizeString } from '../../../helpers';
import { ClipLoader } from 'react-spinners';


const OverdueLoansTable = () => {

    const theme = useTheme();

    const customRenderer = {
        status: (info) => {
            const colors = {
                good: theme.palette.warning.main,
                watchlist: theme.palette.success.main,
                pass: theme.palette.error.main,
                npl: theme.palette.error.main,
                doubtful: theme.palette.error.main,
                "bad debt": theme.palette.error.main,
            };
            const value = info.getValue();
            return (
                <p style={{ color: colors[value] }}>
                    {humanizeString(info.getValue())}
                </p>
            );
        },
    };


    const { loading, rowData, columns } = useFetchTable({
        url: `${mainUrl}/cooperative/loans/overdue_loans/?finance=FBXV6ZkP3REMxfTUCFSJmP`, customRenderer: customRenderer
    })
    return (
        <>
            <BaseTable
                isLoading={loading}
                data={rowData}
                columns={columns}
                title={"Overdue Loans"}
            />
        </>
    );
};

export default OverdueLoansTable