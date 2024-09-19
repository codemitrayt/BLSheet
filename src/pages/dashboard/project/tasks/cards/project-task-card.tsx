import { Avatar, Tag } from "antd";
import dateformat from "dateformat";

import { ProjectTask } from "../../../../../types";
import { capitalizeFirstLetter, cn } from "../../../../../utils";
import { useProjectContext } from "../../../../../providers/project-provider";
import useUserInfo from "../../../../../hooks/useUserInfo";

import DeleteProjectTask from "../helpers/delete";
import UpdateProjectTask from "../helpers/update";
import ProjectTaskComment from "../helpers/comment";
import PorjectTaskAttachment from "../helpers/attachment";
import AssignUserToProjectTask from "../helpers/assign-user";

import { IoMdTime } from "react-icons/io";

interface ProjectTaskCardProps {
  projectTask: ProjectTask;
  refetchProjectTask: () => void;
}

const PROJECT_TASK_PRIORITY_BG_COLOR = {
  low: "green",
  medium: "orange",
  high: "red",
};

const ProjectTaskCard = ({
  projectTask,
  refetchProjectTask,
}: ProjectTaskCardProps) => {
  const { isAdmin } = useProjectContext();
  const { user } = useUserInfo();

  return (
    <div className={cn("border w-[330px] rounded-lg h-fit shadow-sm bg-white")}>
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <div>
            {projectTask.tags.map((tag, ind) => (
              <Tag key={ind} className="rounded-full px-3">
                {capitalizeFirstLetter(tag)}
              </Tag>
            ))}
          </div>

          {projectTask.userId === user?._id || isAdmin ? (
            <div className="flex items-center space-x-2">
              <UpdateProjectTask
                projectTask={projectTask}
                refetchProjectTask={refetchProjectTask}
              />

              <DeleteProjectTask
                objectId={projectTask._id}
                refetchProjectTask={refetchProjectTask}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <h1 className="text-sm font-medium py-2">{projectTask.title}</h1>
        <p className="text-xs">{projectTask.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <Tag color={PROJECT_TASK_PRIORITY_BG_COLOR[projectTask.priority]}>
              {projectTask.priority.toUpperCase()}
            </Tag>
          </div>
          <div className="space-x-1">
            <Avatar className="bg-primary !text-sm" size={25}>
              {projectTask?.user?.fullName[0].toUpperCase()}
            </Avatar>
            <span className="text-sm text-primary">
              {projectTask?.user?.fullName}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <Avatar.Group
            className="!text-xs !border-primary"
            max={{
              count: 2,
              style: { background: "#2F667F", border: "#2F667F" },
            }}
            size={25}
          >
            <Avatar className="bg-primary !text-xs !border-primary">R</Avatar>
            <Avatar className="bg-primary !text-xs !border-primary">S</Avatar>
            <Avatar className="bg-primary !text-xs !border-primary">T</Avatar>
            <Avatar className="bg-primary !text-xs !border-primary">U</Avatar>
          </Avatar.Group>

          <AssignUserToProjectTask />
        </div>

        <div className="flex items-center justify-center space-x-3">
          <div className="text-zinc-800 flex items-center space-x-0.5 text-xs">
            <IoMdTime />
            <span className="text-xs">
              {dateformat(projectTask.endDate, "dd/mm/yyyy")}
            </span>
          </div>

          <PorjectTaskAttachment />
          <ProjectTaskComment />
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskCard;
