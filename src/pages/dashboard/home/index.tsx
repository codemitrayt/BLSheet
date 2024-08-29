import { useQuery } from "react-query";
import { useState } from "react";

import TotalMoneyDistributedAnalytics from "./charts/total-money-distributed-analytics";

import blSheetService from "../../../services/bl-sheet-service";
import useUserInfo from "../../../hooks/useUserInfo";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { MatricsType } from "../../../types";
import SheetAnalyticsCard from "./cards/sheet-analytics-card";
import { cn } from "../../../utils";

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

  return (
    <div className="h-full overflow-auto">
      <div className="grid grid-cols-4 gap-5 justify-items-center">
        {matrics.map((m) => (
          <SheetAnalyticsCard
            isLoading={isLoading}
            matrics={m}
            className={cn(
              m.type === "income"
                ? "bg-emerald-400"
                : m.type === "expense"
                ? "bg-red-400"
                : "bg-orange-400"
            )}
          />
        ))}

        <SheetAnalyticsCard
          isLoading={isLoading}
          matrics={{
            type: "profit",
            total: matrics.reduce((r, b) => r + b.total, 0),
          }}
          className="bg-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6">
        <div className="flex items-center justify-center shadow-sm rounded-lg border p-3">
          <TotalMoneyDistributedAnalytics
            isLoading={isLoading}
            matrics={matrics}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
