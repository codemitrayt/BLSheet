import { Input } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";

import Show from "./helpers/show";
import CreateSheet from "./helpers/create";
import useUserInfo from "../../../hooks/useUserInfo";
import blSheetService from "../../../services/bl-sheet-service";
import useErrorHandler from "../../../hooks/useErrorHandler";

import { BLSheet } from "../../../types";

const DashboardSheetPage = () => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [sheets, setSheets] = useState<BLSheet[]>([]);

  const { isLoading, refetch: refetchBLSheets } = useQuery({
    queryKey: ["get-bl-sheet"],
    queryFn: () => blSheetService().getBlSheets({ authToken }),
    onSuccess: ({ data }) => {
      console.log(data);
      setSheets(data?.message?.blSheets || []);
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
        <Input.Search placeholder="search sheet" className="max-w-sm" />
        <CreateSheet refetchBLSheet={refetchBLSheets} />
      </div>
      <div className="mt-6 overflow-x-auto">
        <Show isLoading={isLoading} data={sheets} />
      </div>
    </div>
  );
};

export default DashboardSheetPage;
