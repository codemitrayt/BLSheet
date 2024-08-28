import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import Show from "./helpers/show";
import CreateSheet from "./helpers/create";

import blSheetService from "../../../services/bl-sheet-service";

import useUserInfo from "../../../hooks/useUserInfo";
import useErrorHandler from "../../../hooks/useErrorHandler";
import useBLSheetFilters from "../../../hooks/useBLSheetFilters";

import { BLSheet, SheetType } from "../../../types";
import { BL_SHEET_TYPES } from "../../../constants";
import { useDebounce } from "../../../hooks/useDebounce";

const PER_PAGE_SIZE = 9;

const DashboardSheetPage = () => {
  const { search, type, setFilters, currentPage } = useBLSheetFilters();
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

  const [totalCount, setTotalCount] = useState<number>(0);
  const [sheets, setSheets] = useState<BLSheet[]>([]);
  const [localSearch, setLocalSearch] = useState<string | undefined>(search);
  const debouncedSearch = useDebounce(localSearch);

  useEffect(() => {
    setFilters({ search: debouncedSearch });
  }, [debouncedSearch]);

  const { isLoading, refetch: refetchBLSheets } = useQuery({
    queryKey: ["get-bl-sheet", { search, type, currentPage }],
    queryFn: () =>
      blSheetService().getBlSheets({
        authToken,
        params: { search, type, currentPage, perPage: PER_PAGE_SIZE },
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
    <div className="relative">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center justify-center space-x-4">
          <Input.Search
            value={localSearch}
            placeholder="search sheet"
            className="max-w-sm"
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <Select
            defaultValue={type as SheetType}
            options={[...BL_SHEET_TYPES, { label: "All", value: "all" }]}
            placeholder="Filter by type"
            className="w-[200px]"
            onChange={(value: SheetType | "all") => setFilters({ type: value })}
          />
        </div>

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
