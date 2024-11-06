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
      fill: ({ type }: { type: string }) => {
        return type === "To Do"
          ? "#FF6666"
          : type === "In Progress"
          ? "#FFD280"
          : type === "Under Review"
          ? "#6699FF"
          : type === "Completed"
          ? "#66FF66"
          : "#2E667E";
      },
    },
    legend: false,
  };

  return <Column {...config} title={title} height={300} />;
};

export default ColumnChart;
