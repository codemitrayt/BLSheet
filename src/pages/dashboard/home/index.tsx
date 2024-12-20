import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Spin } from "antd";

import blSheetService from "../../../services/bl-sheet-service";

import useAuth from "../../../hooks/useAuth";
import useErrorHandler from "../../../hooks/useErrorHandler";

import DisplaySheetAnalyticsCards from "./helpers/display-sheet-analytics-cards";
import TotalMoneyDistributedAnalytics from "./charts/total-money-distributed-analytics";

import { MatricsType, UserRole } from "../../../types";
import { calculateProfilt, cn } from "../../../utils";
import LatestCreatedSheets from "./helpers/latest-created-sheets";
import DailyAnalytics from "./charts/daily-analytics";

const DashboardHomePage = () => {
  const { authToken, user } = useAuth();
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

  useEffect(() => {
    document.title = "Home - BL Sheet";
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spin />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-auto",
        user?.role === UserRole.GUEST
          ? "h-[calc(100vh_-180px)]"
          : "h-[calc(100vh_-75px)]"
      )}
    >
      <DisplaySheetAnalyticsCards matrics={matrics} />
      <DailyAnalytics />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-6">
        <TotalMoneyDistributedAnalytics
          matrics={[
            ...matrics,
            { type: "profit", total: calculateProfilt(matrics) },
          ]}
        />
        <LatestCreatedSheets className="lg:col-span-2" />
      </div>
    </div>
  );
};

export default DashboardHomePage;
