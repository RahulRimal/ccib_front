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
      },
      {
        text: "Overdue History",
        left: "center",
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

    yAxis: {
      type: "value",
    },

    legend: {
      bottom: "bottom",
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
    <div>
      <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default AmountOverdueChart;
