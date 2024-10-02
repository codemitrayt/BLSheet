import { useState } from "react";
import { Spin } from "antd";
import dateFormat from "dateformat";
import { useQuery } from "react-query";
import { Line } from "@ant-design/plots";

import blSheetService from "../../../../services/bl-sheet-service";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import useAuth from "../../../../hooks/useAuth";
import { BLSheet } from "../../../../types";

const DailyAnalytics = () => {
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();

  const [data, setData] = useState<BLSheet[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["daily-analytics"],
    queryFn: () => blSheetService().dailyAnalytics({ authToken }),
    onSuccess: ({ data }) => {
      const matrics = data?.message?.matrics;
      let total = 0;

      const analyticsData = matrics.map((item: BLSheet) => {
        total += item.type === "income" ? item.totalMoney : -item.totalMoney;
        return {
          ...item,
          totalMoney: total,
          date: dateFormat(item.date, "dd-mm-yyyy"),
        };
      });

      setData(analyticsData);
    },
    onError: (error) => {
      console.log("ERROR :: Fetching daily analytics ::", error);
      handleError(error);
    },
    retry: false,
  });

  const config = {
    data,
    xField: "date",
    yField: "totalMoney",
    height: 300,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spin />
      </div>
    );
  }

  return (
    <div className="bg-turnary my-6 rounded-lg border p-6">
      <Line title="Daily Balance Report" {...config} />
    </div>
  );
};

export default DailyAnalytics;
