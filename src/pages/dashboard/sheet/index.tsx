import { useState } from "react";
import { useQuery } from "react-query";

import Show from "./helpers/show";
import CreateSheet from "./helpers/create";

import blSheetService from "../../../services/bl-sheet-service";

import useAuth from "../../../hooks/useAuth";
import useErrorHandler from "../../../hooks/useErrorHandler";
import useBLSheetFilters from "../../../hooks/useBLSheetFilters";

import { BLSheet } from "../../../types";
import BLSheetFilters from "../../../components/filters/bl-sheet-filters";

const PER_PAGE_SIZE = 6;

const DashboardSheetPage = () => {
  const { search, type, currentPage, startDate, endDate } = useBLSheetFilters();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();

  const [totalCount, setTotalCount] = useState<number>(0);
  const [sheets, setSheets] = useState<BLSheet[]>([]);

  const { isLoading, refetch: refetchBLSheets } = useQuery({
    queryKey: [
      "get-bl-sheet",
      { search, type, currentPage, startDate, endDate },
    ],
    queryFn: () =>
      blSheetService().getBlSheets({
        authToken,
        params: {
          search,
          type,
          currentPage,
          perPage: PER_PAGE_SIZE,
          startDate,
          endDate,
        },
      }),
    onSuccess: ({ data }) => {
      setSheets(data?.message?.blSheets || []);
      setTotalCount(data?.message?.totalCount);
    },
    onError: (error) => {
      console.error("ERROR :: get bl sheet ::", error);
      handleError(error);
    },
    retry: false,
  });

  return (
    <div className="relative overflow-y-auto h-full">
      <div className="bg-gray-200/50 border shadow-sm rounded-lg p-3 flex items-center flex-col md:flex-row md:justify-between space-y-2 md:space-x-12 md:space-y-0">
        <BLSheetFilters />
        <CreateSheet refetchBLSheet={refetchBLSheets} />
      </div>

      <div className="mt-6 overflow-x-auto">
        <Show
          totalCount={totalCount}
          isLoading={isLoading}
          perPage={PER_PAGE_SIZE}
          data={sheets}
          refetchBLSheets={refetchBLSheets}
        />
      </div>
    </div>
  );
};

export default DashboardSheetPage;
