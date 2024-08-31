import { Button, Drawer } from "antd";
import { useState } from "react";

import { IoMdAddCircleOutline } from "react-icons/io";
import { LuChevronRightCircle } from "react-icons/lu";

import CreateSheetForm from "../forms/create-sheet-form";

interface CreateSheetProps {
  refetchBLSheet: () => void;
}

const CreateSheet = ({ refetchBLSheet }: CreateSheetProps) => {
  const [drawerState, setDrawerState] = useState(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);

  return (
    <div className="relative w-full md:w-fit">
      <Button
        className="ring-0 px-6 rounded-full w-full md:w-fit"
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
        <CreateSheetForm
          refetchBLSheet={refetchBLSheet}
          onCloseDrawer={onCloseDrawer}
        />
      </Drawer>
    </div>
  );
};

export default CreateSheet;
