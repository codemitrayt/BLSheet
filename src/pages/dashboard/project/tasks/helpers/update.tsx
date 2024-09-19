import { Drawer, Tooltip } from "antd";
import { useState } from "react";

import { TbEdit } from "react-icons/tb";
import { LuChevronRightCircle } from "react-icons/lu";

import { ProjectTask } from "../../../../../types";
import UpdateProjectTaskForm from "../forms/update-project-task-form";

interface UpdateProjectTask {
  projectTask: ProjectTask;
  refetchProjectTask: () => void;
}

const UpdateProjectTask = ({
  projectTask,
  refetchProjectTask,
}: UpdateProjectTask) => {
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);

  return (
    <div className="relative">
      <Tooltip title="Update Project Task">
        <button
          onClick={onOpenDrawer}
          className="text-emerald-500 flex items-center justify-center hover:text-emerald-500/80 transition"
        >
          <TbEdit />
        </button>
      </Tooltip>

      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-primary">Update Project Task</span>}
      >
        <UpdateProjectTaskForm
          onCloseDrawer={onCloseDrawer}
          projectTask={projectTask}
          refetchProjectTaskList={refetchProjectTask}
        />
      </Drawer>
    </div>
  );
};

export default UpdateProjectTask;
