import { Drawer, Tooltip } from "antd";
import { useState } from "react";
import { LuChevronRightCircle } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import UpdateProjectForm from "../forms/update-project-form";
import { Project } from "../../../../types";

interface UpdateProjectProps {
  project: Project;
  refetchProjectList: () => void;
}
const UpdateProject = ({ project, refetchProjectList }: UpdateProjectProps) => {
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);
  return (
    <>
      <div className="relative">
        <Tooltip title="Update Todo">
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
          title={<span className="text-primary">Update Todo</span>}
        >
          <UpdateProjectForm
            onCloseDrawer={onCloseDrawer}
            project={project}
            refetchProjectList={refetchProjectList}
          />
        </Drawer>
      </div>
    </>
  );
};

export default UpdateProject;
