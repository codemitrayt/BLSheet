import { Button, Drawer, Tabs, TabsProps } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";

import { IoMdAddCircleOutline } from "react-icons/io";
import { LuChevronRightCircle } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";

import IncomeTab from "./tabs/income-tab";
import InvestmentTab from "./tabs/investment-tab";
import ExpenseTab from "./tabs/expense-tab";

import blSheetService from "../../../../services/bl-sheet-service";
import useUserInfo from "../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../hooks/useErrorHandler";

import { BLSheet } from "../../../../types";

interface CreateSheetProps {
  refetchBLSheet: () => void;
}

const CreateSheet = ({ refetchBLSheet }: CreateSheetProps) => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

  const [drawerState, setDrawerState] = useState(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);

  const { isLoading, mutate: createBlSheet } = useMutation({
    mutationKey: ["create-bl-sheet"],
    mutationFn: ({ data }: { data: BLSheet }) =>
      blSheetService().createBlSheet({ data, authToken }),
    onSuccess: () => {
      refetchBLSheet();
      onCloseDrawer();
    },
    onError: (error) => {
      console.error("ERROR :: create bl sheet ::", error);
      handleError(error);
    },
    retry: false,
  });

  const items: TabsProps["items"] = [
    {
      key: "income",
      label: (
        <span className="flex items-center justify-center space-x-2 px-2">
          <GoArrowUpRight />
          <span>Income</span>
        </span>
      ),
      children: (
        <IncomeTab createBlSheet={createBlSheet} isLoading={isLoading} />
      ),
    },
    {
      key: "expense",
      label: (
        <span className="flex items-center justify-center space-x-2 px-2">
          <GoArrowDownLeft />
          <span>Expense</span>
        </span>
      ),
      children: (
        <ExpenseTab createBlSheet={createBlSheet} isLoading={isLoading} />
      ),
    },
    {
      key: "investment",
      label: (
        <span className="flex items-center justify-center space-x-2 px-2">
          <FaArrowTrendUp />
          <span>Investment</span>
        </span>
      ),
      children: (
        <InvestmentTab createBlSheet={createBlSheet} isLoading={isLoading} />
      ),
    },
  ];

  return (
    <div className="relative">
      <Button
        className="ring-0 px-6 rounded-full"
        type="primary"
        onClick={onOpenDrawer}
        icon={<IoMdAddCircleOutline />}
      >
        Sheet
      </Button>
      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-primary">Create Sheet</span>}
      >
        <Tabs items={items} />
      </Drawer>
    </div>
  );
};

export default CreateSheet;
