import { useTheme } from "styled-components";
import BaseChart from "../../../components/Charts/BaseChart";
import useFetch from "../../../custom_hooks/useFetch";
import { mainUrl } from "../../../constants";

const incomeChartOption = (theme) => {
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
    },
  };
  return option;
};

const IncomeChart = ({}) => {
  const theme = useTheme();
  const { loading, data } = useFetch({
    url: `${mainUrl}/cooperative/finance/Ur4ox9pJNhLfkqUxdGrTCS/income_overview/`,
  });

  let option = incomeChartOption(theme);
  let xAxisData = [];

  if (data && data.length > 0) {
    data.map((item) => {
      xAxisData.push(item.date);
    });
    // xAxisData = data.total_due.map(item => item.date);
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

  if (data && data.length > 0) {
    series = [
      {
        name: "Overdue",
        type: "line",
        stack: "Total",
        data: [],
      },
      {
        name: "Paid",
        type: "line",
        stack: "Total",
        data: [],
      },
    ];

    data.map((item) => {
      series[0].data.push(item.total_due);
      series[1].data.push(item.total_paid);
    });
  }

  option.series = series;

  return <BaseChart option={option} />;
};

export default IncomeChart;
