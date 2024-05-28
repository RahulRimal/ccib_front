import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import styled, { useTheme } from "styled-components";

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const AnalyticsChart = () => {
  const theme = useTheme();

  const getOption = () => {
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

  return (
    <ChartContainer>
      <ReactECharts
        option={getOption()}
        style={{ width: "100%", height: "100%" }}
      />
    </ChartContainer>
  );
};

export default AnalyticsChart;
