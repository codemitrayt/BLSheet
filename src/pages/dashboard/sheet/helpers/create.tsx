import { Button, Drawer } from "antd";
import { useState } from "react";

import { IoMdAddCircleOutline } from "react-icons/io";
import { LuChevronRightCircle } from "react-icons/lu";

const CreateSheet = () => {
  const [drawerState, setDrawerState] = useState(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);

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
        width={600}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-primary">Create Sheet</span>}
      >
        <h1>Hi</h1>
      </Drawer>
    </div>
  );
};

export default CreateSheet;
