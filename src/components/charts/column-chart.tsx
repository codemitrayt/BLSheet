import { Column } from "@ant-design/plots";
import { ColumnChartData } from "../../types";

interface ColumnChart {
  data: ColumnChartData[];
  title: string;
}

const ColumnChart = ({ data, title }: ColumnChart) => {
  const config = {
    data,
    xField: "type",
    yField: "value",
    style: {
      fill: () => "#2E667E",
    },
    legend: false,
  };

  return <Column {...config} title={title} />;
};

export default ColumnChart;