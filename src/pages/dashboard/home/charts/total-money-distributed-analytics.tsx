import { Spin } from "antd";
import { Pie } from "@ant-design/plots";

import { MatricsType } from "../../../../types";
import { currencyFormate } from "../../../../utils";

interface CompProps {
  isLoading: boolean;
  matrics: MatricsType[];
}

const TotalMoneyDistributedAnalytics = ({ isLoading, matrics }: CompProps) => {
  const config = {
    title: "Money Distribution",
    data: matrics?.map((m) => {
      return {
        ...m,
        total: m.total < 0 ? -1 * m.total : m.total,
        label: currencyFormate(m.total),
      };
    }),
    angleField: "total",
    colorField: "type",
    tooltip: {
      title: "type",
    },
    label: {
      text: "label",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        legend: "right",
      },
    },
  };

  if (isLoading) return <Spin />;

  return <Pie {...config} className="w-[180px]" />;
};

export default TotalMoneyDistributedAnalytics;
