import { useQuery } from "react-query";
import { Spin } from "antd";
import { useState } from "react";
import { Pie } from "@ant-design/plots";

import blSheetService from "../../../../services/bl-sheet-service";
import useUserInfo from "../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import { SheetType } from "../../../../types";

interface MatricsType {
  type: SheetType;
  total: number;
}

const TotalMoneyDistributedAnalytics = () => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [matrics, setMatrics] = useState<MatricsType[]>();

  const { isLoading } = useQuery({
    queryKey: ["totalMoneyDistributed"],
    queryFn: () =>
      blSheetService().totalMoneyDistributedAnalytics({ authToken }),
    onSuccess: ({ data }) => {
      const matrics = data?.message?.matrics;
      setMatrics(matrics);
    },
    onError: (error) => {
      console.error("ERROR :: total money distributed analytics ::", error);
      handleError(error);
    },
    retry: false,
  });

  const config = {
    title: "Money Distribution",
    data: matrics?.map((m) => {
      return { ...m, total: m.total < 0 ? -1 * m.total : m.total };
    }),
    angleField: "total",
    colorField: "type",
    tooltip: {
      title: "type",
    },
    label: {
      text: "total",
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
