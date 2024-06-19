import react from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "styled-components";

const UserCreditHistoryChart = () => {
  const theme = useTheme();

  const option = {
    title: {
      text: "Credit history",
      show: true,
      textStyle: {
        color: theme.palette.primary.main,
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      bottom: theme.spacing.s8,
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [2019, 2020, 2021, 2022, 2023, 2024],
    },
    yAxis: {
      type: "value",
      /* axisLabel: {
                formatter: '{value} °C'
            } */
    },
    series: [
      {
        name: "Loans Taken",
        type: "line",
        showSymbol: false,
        smooth: true,
        data: [2, 5.5, 2, 8.5, 1.5, 5],
        /* markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                }, */
      },
      {
        name: "Healthy Loans",
        type: "line",
        showSymbol: false,
        smooth: true,
        data: [4, 9, 1, 5, 1, 7],
      },
      {
        name: "Defaulted Loans",
        type: "line",
        showSymbol: false,
        smooth: true,
        data: [0, 9, 1, 9, 1, 9],
      },
    ],
  };

  return (
    // render echarts option.
    <ReactECharts option={option} />
  );
};

export default UserCreditHistoryChart;
