import { Avatar, Tag } from "antd";

import { useProjectContext } from "../../../../../../providers/project-provider";
import { MemberRoles, ProjectTask } from "../../../../../../types";
import AssignUserToProjectTask from "../../helpers/assign-user";
import UpdateStatus from "../../helpers/update-status";

interface TaskDataCardProps {
  task: ProjectTask;
  refetch: () => void;
}

const PROJECT_TASK_PRIORITY_BG_COLOR = {
  low: "green",
  medium: "orange",
  high: "red",
};

const TaskDataCard = ({ task, refetch }: TaskDataCardProps) => {
  const { project } = useProjectContext();

  return (
    <div className="space-y-3 w-full col-span-2">
      <div className="space-y-2 p-3 rounded-lg bg-gray-100 border border-gray-200 shadow-sm h-fit w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-primary text-sm font-bold">Assingees</h1>
          {project?.role !== MemberRoles.MEMBER && (
            <AssignUserToProjectTask
              projectTask={task}
              refetchProjectTasks={refetch}
            />
          )}
        </div>

        <div className="flex items-center">
          <Avatar.Group
            className="!text-xs !border-primary"
            max={{
              count: 6,
              style: { background: "#2F667F", border: "#2F667F" },
            }}
            size={25}
          >
            {task.assignedMembers.map((member) => (
              <Avatar
                className="bg-primary !text-xs !border-primary"
                key={member._id}
              >
                {member.memberEmailId[0].toUpperCase()}
              </Avatar>
            ))}
          </Avatar.Group>
        </div>
      </div>

      <div className="space-y-2 p-3 rounded-lg bg-gray-100 border border-gray-200 shadow-sm h-fit w-full">
        <h1 className="text-primary text-sm font-bold">Priority</h1>
        <div className="flex items-center">
          <Tag color={PROJECT_TASK_PRIORITY_BG_COLOR[task.priority]}>
            {task.priority.toUpperCase()}
          </Tag>
        </div>
      </div>

      {(task.isCreator ||
        task.isMember ||
        project?.role !== MemberRoles.MEMBER) && (
        <div className="space-y-2 p-3 rounded-lg bg-gray-100 border border-gray-200 shadow-sm h-fit w-full">
          <h1 className="text-primary text-sm font-bold">Update Status</h1>

          <div className="flex items-center justify-between mt-4">
            <UpdateStatus projectTask={task} refetchProjectTask={refetch} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDataCard;
