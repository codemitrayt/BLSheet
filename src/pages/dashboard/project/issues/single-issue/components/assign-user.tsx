import { useState } from "react";
import { Drawer, Tooltip } from "antd";
import { LuChevronRightCircle } from "react-icons/lu";
import { MdOutlineAddCircle } from "react-icons/md";

import { useProjectContext } from "../../../../../../providers/project-provider";
import AssignUserForm from "../forms/assign-user-form";

const AssignUser = () => {
  const { isAdmin } = useProjectContext();
  const [drawerState, setDrawerState] = useState(false);
  const openDrawer = () => setDrawerState(true);
  const closeDrawer = () => setDrawerState(false);

  if (!isAdmin) return null;

  return (
    <div className="relative">
      <Tooltip title="Assign Users">
        <button onClick={openDrawer} className="text-primary">
          <MdOutlineAddCircle className="size-5" />
        </button>
      </Tooltip>

      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={closeDrawer}
        title={<span className="text-primary">Assign Users</span>}
      >
        <AssignUserForm />
      </Drawer>
    </div>
  );
};

export default AssignUser;
