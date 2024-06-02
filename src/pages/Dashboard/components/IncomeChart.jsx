import { useTheme } from "styled-components";
import BaseChart from "../../../components/Charts/BaseChart";
import useFetch from "../../../custom_hooks/useFetch";
import { mainUrl } from "../../../constants";


const incomeChartOption = () => {
    const theme = useTheme();
    const option = {
        title: {
            text: "Income Overview",
            textStyle: {
                fontSize: theme.typography.fontSize.f20,
            },
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            bottom: 0,
            left: "center",
            textStyle: {
                fontSize: theme.typography.fontSize.f14,
                fontWeight: "bold",
            },
            itemWidth: 25,
            itemHeight: 18,
            itemGap: 15,
        },
        grid: {
            left: "3%",
            right: "5%",
            bottom: "10%",
            containLabel: true,
        },
        toolbox: {
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
        },
        yAxis: {
            type: "value",
        }
    };
    return option;
};


const IncomeChart = ({ }) => {

    const { loading, data } = useFetch({ url: `${mainUrl}/cooperative/finance/income_overview/?finance=36MHASzorqBBdKP2CccsYm` });

    let option = incomeChartOption();
    let xAxisData = [];

    if (data) {
        xAxisData = data.total_due.map(item => item.date,
        );
    }

    // option.xAxis.data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    option.xAxis.data = xAxisData;
    /* option.series = [
        {
            name: "Overdue",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330],
        },
        {
            name: "Paid",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230],
        },
    ];*/
    let series = [];

    if (data) {
        series = [
            {
                name: "Overdue",
                type: "line",
                stack: "Total",
                data: data.total_due.map(item => item.amount),
            },
            {
                name: "Paid",
                type: "line",
                stack: "Total",
                data: data.total_paid.map(item => item.amount),
            },
        ];
    }

    option.series = series;

    return (
        <BaseChart option={option} />
    )
};

export default IncomeChart;
