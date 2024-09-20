import { Drawer, Tooltip } from "antd";
import { useState } from "react";

import { ProjectTask } from "../../../../../types";

import { LuChevronRightCircle } from "react-icons/lu";
import { RiAddFill } from "react-icons/ri";
import AssignUserForm from "../forms/assign-user-form";

interface AssignUserToProjectTask {
  projectTask: ProjectTask;
}

const AssignUserToProjectTask = ({ projectTask }: AssignUserToProjectTask) => {
  const [drawerState, setDrawerState] = useState(false);
  const openDrawer = () => setDrawerState(true);
  const closeDrawer = () => setDrawerState(false);

  return (
    <div className="relative">
      <Tooltip title="Assign Users">
        <button
          onClick={openDrawer}
          className="text-white hover:bg-primary/80 transition size-6 bg-primary flex items-center justify-center rounded-full"
        >
          <RiAddFill />
        </button>
      </Tooltip>

      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={closeDrawer}
        title={
          <span className="text-primary">Assign User to Project Task</span>
        }
      >
        <AssignUserForm projectTask={projectTask} />
      </Drawer>
    </div>
  );
};

export default AssignUserToProjectTask;
