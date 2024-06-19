import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import styled, { useTheme } from "styled-components";

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const analyticsOption = () => {
  const theme = useTheme();
  const data = [
    { value: 1048, name: "Search Engine" },
    { value: 735, name: "Direct" },
    { value: 580, name: "Email" },
    { value: 484, name: "Union Ads" },
    { value: 300, name: "Video Ads" },
  ];

  const option = {
    title: {
      text: "Analytics",
      textStyle: {
        fontSize: theme.typography.fontSize.f20,
      },
      left: "left",
      top: 0,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      left: "10%",
      orient: "vertical",
      top: "center",
      textStyle: {
        fontSize: theme.typography.fontSize.f14,
        fontWeight: "bold",
      },
      itemWidth: 30,
      itemHeight: 20,
      itemGap: 15,
      formatter: (name) => {
        const item = data.find((item) => item.name === name);
        return `${name}: ${item.value}`;
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        center: ["70%", "50%"],
        data: data,
      },
    ],
  };

  return option;
};

export const profibabilityRatioChartOption = () => {
  const theme = useTheme();
  const originalData = [
    ["amount", "product"],
    [58212, "Net Profit Margin"],
    [78254, "Pretax Profit Margin"],
    [41032, "Operating Profit Margin"],
    [12755, "Gross Profit Margin"],
  ];

  // Calculate the total amount
  const totalAmount = originalData
    .slice(1)
    .reduce((sum, item) => sum + item[0], 0);

  // Convert amount values to percentages
  const percentageData = originalData.map((item, index) => {
    if (index === 0) return ["percentage", "product"];
    return [((item[0] / totalAmount) * 100).toFixed(2), item[1]];
  });

  const option = {
    title: {
      text: "Profitability Indicator Ratio",
      textStyle: {
        fontSize: theme.typography.fontSize.f20,
      },
      left: "left",
      top: 0,
    },
    tooltip: {
      trigger: "item",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    dataset: {
      source: percentageData,
    },
    legend: {
      bottom: 0,
      left: "center",
      textStyle: {
        fontSize: theme.typography.fontSize.f14,
      },
      itemWidth: 25,
      itemHeight: 18,
      itemGap: 15,
    },
    grid: {
      containLabel: true,
      top: "15%",
      left: "10%",
      right: "10%",
      bottom: "5%",
    },
    xAxis: {
      name: "",
    },
    yAxis: { type: "category" },
    visualMap: {
      orient: "horizontal",
      left: "-100%",
      min: 0,
      max: 100,
      text: ["High", "Low"],
      dimension: 0,
      inRange: {
        color: ["#65B581", "#FFCE34", "#FD665F"],
      },
    },
    series: [
      {
        type: "bar",
        gap: 1,
        label: {
          show: true,
          position: "right",
          formatter: (value) => `${value.data[0]}%`,
        },
        encode: {
          x: "percentage",
          y: "product",
        },
      },
    ],
  };

  return option;
};

export const loanHistoryChartOption = () => {
  const theme = useTheme();

  const generateMonthlyData = (numYears) => {
    const numMonths = numYears * 12;
    const data1 = [];
    const data2 = [];
    const data3 = [];
    for (let i = 0; i < numMonths; i++) {
      data1.push(Math.random() * 20);
      data2.push(Math.random() * 20);
      data3.push(Math.random() * 20);
    }
    return { data1, data2, data3 };
  };

  const generateMonthsLabels = (numYears) => {
    const months = [];
    const startYear = new Date().getFullYear() - numYears + 1;
    for (let i = 0; i < numYears; i++) {
      for (let j = 0; j < 12; j++) {
        const month = new Date(startYear + i, j).toLocaleString("default", {
          month: "short",
        });
        const year = startYear + i;
        months.push(`${month} ${year}`);
      }
    }
    return months;
  };

  const { data1, data2, data3 } = generateMonthlyData(10);
  const months = generateMonthsLabels(10);

  const option = {
    animationDuration: 10000,
    title: {
      text: "Loan History Analysis",
      textStyle: {
        fontSize: theme.typography.fontSize.f20,
      },
      left: "left",
      top: 0,
    },
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["Healthy Loans", "Overdue Loans", "Defaulted Loans"],
      bottom: 0,
      left: "center",
      textStyle: {
        fontSize: theme.typography.fontSize.f14,
      },
      itemWidth: 25,
      itemHeight: 18,
      itemGap: 15,
    },
    grid: {
      containLabel: true,
      top: "15%",
      left: "5%",
      right: "5%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: months,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Healthy Loans",
        type: "line",
        data: data1,
      },
      {
        name: "Overdue Loans",
        type: "line",
        data: data2,
      },
      {
        name: "Defaulted Loans",
        type: "line",
        data: data3,
      },
    ],
  };

  return option;
};

const BaseChart = ({ option }) => {
  const theme = useTheme();

  return (
    <ChartContainer>
      <ReactECharts option={option} style={{ width: "100%", height: "100%", minHeight: "300px" }} />
    </ChartContainer>
  );
};

export default BaseChart;
