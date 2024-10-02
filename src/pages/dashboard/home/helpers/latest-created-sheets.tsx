import { useQuery } from "react-query";
import { useState } from "react";
import { Button, Spin } from "antd";

import { BLSheet } from "../../../../types";
import { cn } from "../../../../utils";

import blSheetService from "../../../../services/bl-sheet-service";
import useAuth from "../../../../hooks/useAuth";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import BLSheetDetailsCard from "../cards/bl-sheet-details-card";

import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PER_PAGE_SIZE = 8;

interface LatestCreatedSheetsProps {
  className: string;
}

const LatestCreatedSheets = ({ className }: LatestCreatedSheetsProps) => {
  const [sheets, setSheets] = useState<BLSheet[]>([]);
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const navigate = useNavigate();

  const redirectSheetPage = (url: string) => {
    navigate(url);
  };

  const { isLoading } = useQuery({
    queryKey: ["get-bl-sheet"],
    queryFn: () =>
      blSheetService().getBlSheets({
        authToken,
        params: {
          perPage: PER_PAGE_SIZE,
        },
      }),
    onSuccess: ({ data }) => {
      setSheets(data?.message?.blSheets || []);
    },
    onError: (error) => {
      console.error("ERROR :: get bl sheet ::", error);
      handleError(error);
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin />
      </div>
    );
  }

  if (!sheets.length) {
    return (
      <div
        className={cn(
          "p-3 flex items-center flex-col space-y-4 justify-center rounded-lg border",
          className
        )}
      >
        <p className="text-primary text-sm font-medium">
          No sheets found! Please create sheet.
        </p>
        <Button
          type="primary"
          className="px-6 rounded-full ring-0"
          onClick={() => redirectSheetPage("/dashboard/sheet?isCreate=true")}
        >
          Create Sheet
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("border p-3 shadow-sm rounded-lg", className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-primary text-sm lg:text-lg font-medium">
          Latest Created Sheet
        </h1>
        <button
          onClick={() => redirectSheetPage("/dashboard/sheet")}
          className="text-primary hover:text-primary/80 transition-all flex items-center justify-center space-x-1"
        >
          <span className="text-xs lg:text-sm"> View All</span>
          <MdOutlineArrowRightAlt />
        </button>
      </div>
      <div className="mt-4 gap-2 grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {sheets.map((sheet) => (
          <BLSheetDetailsCard sheet={sheet} key={sheet._id} />
        ))}
      </div>
    </div>
  );
};

export default LatestCreatedSheets;
