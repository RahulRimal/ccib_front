import ReactECharts from "echarts-for-react";
import { useTheme } from "styled-components";

const PieChart = ({ title, data = [] }) => {
  const theme = useTheme();

  //     title: {
  //       text: "Overdue",
  //       left: "center",
  //     },
  //     tooltip: {
  //       trigger: "item",
  //     },
  //     legend: {
  //       orient: "vertical",
  //       left: "center",
  //       bottom: "bottom",
  //     },

  //     series: [
  //       {
  //         name: "Access From",
  //         type: "pie",
  //         radius: "60%",
  //         data: [
  //           { value: 98, name: "Search Engine" },
  //           { value: 2, name: "Direct" },
  //         ],
  //         emphasis: {
  //           itemStyle: {
  //             shadowBlur: 10,
  //             shadowOffsetX: 0,
  //             shadowColor: "rgba(0, 0, 0, 0.5)",
  //           },
  //         },
  //       },
  //     ],
  //   };
  const option = {
    title: {
      text: title,
      left: "center",
    },
    tooltip: {
      show: false,
      trigger: "item",
    },
    legend: {
      left: "center",
      bottom: 20,
    },
    series: [
      {
        name: "Percentage",
        type: "pie",
        radius: "50%",
        rotate: "29",
        data: data,
        bottom: 40,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          show: true,
          formatter: "{b} ({d}%)",
        },
      },
    ],
  };
  return (
    // render echarts option.
    <div style={{ width: "100%", padding: theme.spacing.s12 }}>
      <ReactECharts option={option} />
    </div>
  );
};

export default PieChart;
