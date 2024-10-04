import { useSearchParams } from "react-router-dom";
import { Button, Drawer } from "antd";
import { useState } from "react";

import { IoMdAddCircleOutline } from "react-icons/io";
import { LuChevronRightCircle } from "react-icons/lu";

import CreateSheetForm from "../forms/create-sheet-form";
import useAuth from "../../../../hooks/useAuth";
import { UserRole } from "../../../../types";

interface CreateSheetProps {
  refetchBLSheet: () => void;
}

const CreateSheet = ({ refetchBLSheet }: CreateSheetProps) => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerState, setDrawerState] = useState(
    searchParams.get("isCreate") ? true : false
  );

  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);
  const clearParams = () => {
    setSearchParams((params) => {
      params.delete("isCreate");
      return params;
    });
  };

  return (
    <div className="relative w-full md:w-fit">
      <Button
        className="ring-0 px-6 rounded-full w-full md:w-fit"
        type="primary"
        onClick={onOpenDrawer}
        icon={<IoMdAddCircleOutline />}
        disabled={user?.role === UserRole.GUEST}
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
        <CreateSheetForm
          refetchBLSheet={refetchBLSheet}
          onCloseDrawer={onCloseDrawer}
          clearParams={clearParams}
        />
      </Drawer>
    </div>
  );
};

export default CreateSheet;
