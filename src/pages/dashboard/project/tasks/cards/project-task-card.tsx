import { Avatar, Tag } from "antd";
import dateformat from "dateformat";
import { Link } from "react-router-dom";

import { MemberRoles, ProjectTask } from "../../../../../types";
import { cn, getDueDateColor, strSlice } from "../../../../../utils";
import { useProjectContext } from "../../../../../providers/project-provider";
import { TASK_TYPE_COLOR } from "../../../../../constants/task-type";

import DeleteProjectTask from "../helpers/delete";
import UpdateProjectTask from "../helpers/update";
import ProjectTaskComment from "../helpers/comment";
import PorjectTaskAttachment from "../helpers/attachment";
import AssignUserToProjectTask from "../helpers/assign-user";
import UpdateStatus from "../helpers/update-status";

interface ProjectTaskCardProps {
  projectTask: ProjectTask;
  refetchProjectTask: () => void;
  isHide?: boolean;
}

const PROJECT_TASK_PRIORITY_BG_COLOR = {
  low: "green",
  medium: "orange",
  high: "red",
};

const ProjectTaskCard = ({
  projectTask,
  refetchProjectTask,
  isHide = false,
}: ProjectTaskCardProps) => {
  const { project } = useProjectContext();

  return (
    <div className={cn("border w-[330px] rounded-lg h-fit shadow-sm bg-white")}>
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <Tag
              className="rounded-full px-3"
              color={TASK_TYPE_COLOR[projectTask.taskType]}
            >
              {projectTask.taskType}
            </Tag>
            <Tag className="rounded-full px-3">
              Task #{projectTask.taskNumber}
            </Tag>
          </div>

          {projectTask.isCreator || project?.role !== MemberRoles.MEMBER ? (
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

        <div className="mt-1">
          <Link
            to={`/dashboard/projects/${project?._id}/tasks/${projectTask._id}`}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-all"
          >
            {isHide ? strSlice(projectTask.title, 30) : projectTask.title}
          </Link>
        </div>

        {!isHide && (
          <>
            <p className="text-xs">{projectTask?.description}</p>
            {!!projectTask.subtasks?.length && (
              <div className="mt-1">
                <div className="text-xs pl-2 prose list-disc">
                  {projectTask.subtasks.map((subtask, i) => (
                    <li key={i}>{subtask.title}</li>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

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

        {(projectTask.isCreator ||
          projectTask.isMember ||
          project?.role !== MemberRoles.MEMBER) &&
          !isHide && (
            <div className="flex items-center justify-between mt-4">
              <UpdateStatus
                projectTask={projectTask}
                refetchProjectTask={refetchProjectTask}
              />
            </div>
          )}
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
            {projectTask.assignedMembers.map((member) => (
              <Avatar
                className="bg-primary !text-xs !border-primary"
                key={member._id}
              >
                {member.memberEmailId[0].toUpperCase()}
              </Avatar>
            ))}
          </Avatar.Group>

          {project?.role !== MemberRoles.MEMBER && (
            <AssignUserToProjectTask
              projectTask={projectTask}
              refetchProjectTasks={refetchProjectTask}
            />
          )}
        </div>

        <div className="flex items-center justify-center space-x-3">
          <div
            className={
              (cn("flex items-center space-x-1 text-xs"),
              getDueDateColor(projectTask.endDate))
            }
          >
            <span className="text-xs">Due date:</span>
            <span className="text-xs">
              {dateformat(projectTask.endDate, "dd/mm/yyyy")}
            </span>
          </div>
          <PorjectTaskAttachment />
          <ProjectTaskComment
            projectTaskId={projectTask._id}
            count={projectTask.commentCount}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskCard;
