import { Button, Drawer } from "antd";
import { useState } from "react";

import { IoMdAddCircleOutline } from "react-icons/io";
import { LuChevronRightCircle } from "react-icons/lu";

import CreateProjectForm from "../forms/create-project-form";
import useAuth from "../../../../hooks/useAuth";
import { UserRole } from "../../../../types";

interface CreateProjectProps {
  refetchProjectList: () => void;
}

const CreateProject = ({ refetchProjectList }: CreateProjectProps) => {
  const { user } = useAuth();
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
        disabled={user?.role === UserRole.GUEST}
      >
        Project
      </Button>
      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-primary">Create Project</span>}
      >
        <CreateProjectForm
          refetchProjectList={refetchProjectList}
          onCloseDrawer={onCloseDrawer}
        />
      </Drawer>
    </div>
  );
};

export default CreateProject;
