import { useTheme } from "styled-components";
import BaseChart from "../../../components/Charts/BaseChart";
import useFetch from "../../../custom_hooks/useFetch";
import { mainUrl } from "../../../constants";


const profitLossChartOption = () => {
  const theme = useTheme();
  const option = {
    title: {
      text: "Profit and Loss Overview",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        let tar;
        if (params[1] && params[1].value !== "-") {
          tar = params[1];
        } else {
          tar = params[2];
        }
        return tar && tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
      },
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
    data: ["Profit", "Loss"],
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",

    },
    toolbox: {
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    yAxis: {
      type: "value",
    },
  };
  return option;
};


const IncomeChart = ({ }) => {
  const theme = useTheme();

  // const {loading, data} = useFetch({ url: `${mainUrl}/cooperative/finance/income_overview/?finance=36MHASzorqBBdKP2CccsYm`});

  let option = profitLossChartOption();
  option.data = (function () {
    let list = [];
    for (let i = 1; i <= 11; i++) {
      list.push("Nov " + i);
    }
    return list;
  })();

  option.series = [
    {
      name: "Placeholder",
      type: "bar",
      stack: "Total",
      silent: true,
      itemStyle: {
        borderColor: "transparent",
        color: "transparent",
      },
      emphasis: {
        itemStyle: {
          borderColor: "transparent",
          color: "transparent",
        },
      },
      data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292],
    },
    {
      name: "Profit",
      type: "bar",
      stack: "Total",
      itemStyle: {
        color: theme.palette.success.main,
      },
      label: {
        show: true,
        position: "top",
      },
      data: [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"],
    },
    {
      name: "Loss",
      type: "bar",
      stack: "Total",
      itemStyle: {
        color: theme.palette.error.main,
      },
      label: {
        show: true,
        position: "bottom",
      },
      data: ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203],
    },
  ];

  return (
    <BaseChart option={option} />
  )
};

export default IncomeChart;
