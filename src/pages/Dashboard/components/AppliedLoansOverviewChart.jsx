import { useTheme } from "styled-components";
import React from 'react'
import BaseChart from "../../../components/Charts/BaseChart";
import useFetch from "../../../custom_hooks/useFetch";
import { mainUrl } from "../../../constants";
import { formatDate } from "../../../helpers";


const loanOverviewChartOption = () => {

    const option = {
        useUTC: false,
        tooltip: {
            useUTC: false,
            trigger: "axis",
            position: function (pt) {
                return [pt[0], "5%"];
            },
        },
        title: {
            left: "left",
            text: "Total Loans Applied",
        },
        grid: {
            left: "3%",
            right: "3%",
            bottom: "15%",
            containLabel: true,
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: "none",
                },
                restore: {},
                saveAsImage: {},
            },
        },
        xAxis: {
            type: "time",
            boundaryGap: false,
        },
        yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
        },
        dataZoom: [
            {
                type: "inside",
                start: 0,
                end: 100,
            },
            {
                start: 0,
                end: 100,
            },
        ],
        series: [
            {
                name: "Loan Applied",
                type: "line",
                smooth: true,
                symbol: "none",
                areaStyle: {},
            },
        ],
    };
    return option;
};



const AppliedLoansOverviewChart = () => {

    const { loading, data } = useFetch({ url: `${mainUrl}/cooperative/loanapplications/loan_application_history?finance=36MHASzorqBBdKP2CccsYm` })

    let optionData = []

    if (data) {
        optionData = data.map(item => [formatDate(new Date(item.date)), item.count]

        )
    }

    let option = loanOverviewChartOption();
    option.series[0].data = optionData


    return (
        <BaseChart
            option={option} />
    );
}

export default AppliedLoansOverviewChart