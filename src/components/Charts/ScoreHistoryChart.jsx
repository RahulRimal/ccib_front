import react from "react";
import ReactECharts from "echarts-for-react";
import styled, { useTheme } from "styled-components";

const Wrapper = styled.div`
  height: ${({ height }) => height || "550px"};
`;

const ScoreHistoryChart = ({ style, height }) => {
  const theme = useTheme();

  const option = {
    title: [
      {
        text: "Score History for Last 12 Months",
        left: "center", // Center the bottom title
        bottom: "0%", // Position at the bottom
        textAlign: "center",
        textVerticalAlign: "bottom",
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },

    xAxis: {
      type: "category",
      data: [
        "May-23",
        "Jun-23",
        "July-23",
        "Aug-13",
        "Sep-23",
        "Oct-23",
        "Nov-23",
        "Dec-23",
        "Jan-24",
        "Feb-24",
        "Mar-24",
        "Apr-24",
      ],
    },
    grid: {
      top: 50,
      bottom: 80,
    },
    yAxis: {
      type: "value",
      interval: 100,
    },
    series: [
      {
        data: [
          {
            value: 100,
            itemStyle: {
              color: theme.palette.common.red,
            },
          },
          {
            value: 130,
            itemStyle: {
              color: theme.palette.common.red,
            },
          },

          {
            value: 300,
            itemStyle: {
              color: theme.palette.common.blue,
            },
          },
          {
            value: 350,
            itemStyle: {
              color: theme.palette.common.blue,
            },
          },
          {
            value: 380,
            itemStyle: {
              color: theme.palette.common.blue,
            },
          },
          {
            value: 400,
            itemStyle: {
              color: theme.palette.common.green,
            },
          },
          {
            value: 500,
            itemStyle: {
              color: theme.palette.common.green,
            },
          },
          {
            value: 600,
            itemStyle: {
              color: theme.palette.common.green,
            },
          },
          {
            value: 640,
            itemStyle: {
              color: theme.palette.common.green,
            },
          },
          {
            value: 930,
            itemStyle: {
              color: theme.palette.common.purple,
            },
          },
          {
            value: 983,
            itemStyle: {
              color: theme.palette.common.purple,
            },
          },
          {
            value: 989,
            itemStyle: {
              color: theme.palette.common.purple,
            },
          },
        ],
        type: "bar",
        barWidth: "20",
      },
    ],
  };

  return (
    // render echarts option.
    <Wrapper style={{ style }} height={height}>
      <ReactECharts option={option} style={{ height: "100%" }} />
    </Wrapper>
  );
};

export default ScoreHistoryChart;
