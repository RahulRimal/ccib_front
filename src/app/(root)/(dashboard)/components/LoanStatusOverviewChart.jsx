import React from "react";
import BaseChart from "@/app/components/Charts/BaseChart";
import { useTheme } from "styled-components";

export const loanStatusChartOption = () => {
  const theme = useTheme();
  const option = {
    title: {
      text: "Loan Status Overview",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      left: "center",
      bottom: 0,
      data: ["Healthy Loans", "Unhealthy Loans", "Defaulted Loans"],
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
    radar: [
      {
        indicator: [
          { text: "Healthy", max: 100 },
          { text: "Unhealthy", max: 100 },
          { text: "Defaulted", max: 100 },
        ],
        center: ["50%", "55%"],
      },
    ],
    series: [
      {
        type: "radar",
        tooltip: {
          trigger: "item",
        },
        areaStyle: {},
        data: [
          {
            value: [60, 73, 85, 40],
            // value: [60, 10, 0],
            name: "Healthy Loans",
          },
          {
            value: [60, 3, 85, 40],
            name: "Unhealthy Loans",
          },
          {
            value: [10, 73, 85, 40],
            name: "Defaulted Loans",
          },
        ],
      },
    ],
  };
  return option;
};

const LoanStatusOverviewChart = () => {
  return <BaseChart option={loanStatusChartOption()} />;
};

export default LoanStatusOverviewChart;
