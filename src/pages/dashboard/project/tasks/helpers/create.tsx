import { Button, Drawer } from "antd";
import { useState } from "react";

import { IoMdAddCircleOutline } from "react-icons/io";
import { LuChevronRightCircle } from "react-icons/lu";

import CreateProjectTaskForm from "../forms/create-project-task-form";

interface CreateProjectTasksProps {
  refetchProjectTaskList: () => void;
}

const CreateProjectTask = ({
  refetchProjectTaskList,
}: CreateProjectTasksProps) => {
  const [drawerState, setDrawerState] = useState<boolean>(false);
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
        Task
      </Button>
      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-primary">Create Project Task</span>}
      >
        <CreateProjectTaskForm
          refetchProjectTaskList={refetchProjectTaskList}
          onCloseDrawer={onCloseDrawer}
        />
      </Drawer>
    </div>
  );
};

export default CreateProjectTask;
