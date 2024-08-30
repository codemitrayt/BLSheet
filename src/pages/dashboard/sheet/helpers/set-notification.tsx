import { Drawer, Tooltip } from "antd";
import { useState } from "react";
import { LuChevronRightCircle } from "react-icons/lu";
import { MdNotifications } from "react-icons/md";

const SetNotification = () => {
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const openDrawer = () => setDrawerState(true);
  const closeDrawer = () => setDrawerState(false);

  return (
    <div>
      <Tooltip title="Set notification">
        <button
          onClick={openDrawer}
          className="flex items-center justify-center text-orange-500 hover:text-orange-500/80 transition-all"
        >
          <MdNotifications />
        </button>
      </Tooltip>

      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={closeDrawer}
        title={<span className="text-primary">Set notification</span>}
      >
        <h1>This feature comming soon..</h1>
      </Drawer>
    </div>
  );
};

export default SetNotification;
