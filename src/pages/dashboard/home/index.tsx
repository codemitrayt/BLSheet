import { useQuery } from "react-query";
import { useState } from "react";

import blSheetService from "../../../services/bl-sheet-service";

import useUserInfo from "../../../hooks/useUserInfo";
import useErrorHandler from "../../../hooks/useErrorHandler";

import DisplaySheetAnalyticsCards from "./helpers/display-sheet-analytics-cards";
import TotalMoneyDistributedAnalytics from "./charts/total-money-distributed-analytics";

import { MatricsType } from "../../../types";
import { Spin } from "antd";

const DashboardHomePage = () => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [matrics, setMatrics] = useState<MatricsType[]>([]);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spin />
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <DisplaySheetAnalyticsCards matrics={matrics} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-6">
        <TotalMoneyDistributedAnalytics matrics={matrics} />
      </div>
    </div>
  );
};

export default DashboardHomePage;
