import { Pie } from "@ant-design/plots";

import { MatricsType } from "../../../../types";
import { currencyFormate } from "../../../../utils";

interface CompProps {
  matrics: MatricsType[];
}

const TotalMoneyDistributedAnalytics = ({ matrics }: CompProps) => {
  const config = {
    title: "Money Distribution",
    data: matrics?.map((m) => {
      return {
        ...m,
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

  if (!matrics?.length) return null;
  return (
    <div className="flex items-center justify-center shadow-sm rounded-lg border p-3">
      <Pie {...config} className="w-[180px]" />
    </div>
  );
};

export default TotalMoneyDistributedAnalytics;
