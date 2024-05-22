import react from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "styled-components";

const AmountOverdueChart = () => {
  const theme = useTheme();

  const option = {
    title: [
      {
        text: "Overdue History",
        left: "center",
        top: theme.spacing.s8,
        // textAlign: "center",
      },
      {
        text: "Overdue History",
        left: "center",
        bottom: "-5px",
        // textAlign: "center",
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
      ],
    },
    grid: {
      top: 50,
      bottom: 70,
    },
    yAxis: {
      type: "value",
    },

    legend: {
      bottom: theme.spacing.s20,
      data: ["Amount Overdue"],
      textStyle: {
        fontSize: theme.typography.fontSize.f16,
      },
    },

    series: [
      {
        name: "Amount Overdue",
        data: [
          {
            value: 300,
          },

          {
            value: 400,
          },
          {
            value: 500,
          },
          {
            value: 600,
          },
          {
            value: 640,
          },
          {
            value: 930,
          },
          {
            value: 983,
          },
          {
            value: 989,
          },
        ],
        type: "bar",
        barWidth: "0",
      },
    ],
  };

  return (
    // render echarts option.
    <div style={{ width: "100%" }}>
      <ReactECharts option={option} />
    </div>
  );
};

export default AmountOverdueChart;
