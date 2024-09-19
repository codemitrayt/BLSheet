import { Drawer } from "antd";
import { useState } from "react";

import { LuChevronRightCircle } from "react-icons/lu";
import { RiAttachment2 } from "react-icons/ri";

const PorjectTaskAttachment = () => {
  const [drawerState, setDrawerState] = useState(false);
  const openDrawer = () => setDrawerState(true);
  const closeDrawer = () => setDrawerState(false);

  return (
    <div className="relative">
      <button
        onClick={openDrawer}
        className="text-primary hover:text-primary/80 transition-all flex items-center justify-center space-x-[1px]"
      >
        <RiAttachment2 className="size-4" />
        <span className="text-sm">0</span>
      </button>

      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={closeDrawer}
        title={<span className="text-primary">Attachment</span>}
      >
        <h1>Project task attachment</h1>
      </Drawer>
    </div>
  );
};

export default PorjectTaskAttachment;
