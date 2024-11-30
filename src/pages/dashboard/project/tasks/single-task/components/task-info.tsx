import { Avatar, Tag } from "antd";
import { useNavigate } from "react-router-dom";

import { MemberRoles, ProjectTask } from "../../../../../../types";
import { useProjectContext } from "../../../../../../providers/project-provider";

import UpdateProjectTask from "../../helpers/update";
import DeleteProjectTask from "../../helpers/delete";

interface TaskInfoProps {
  task: ProjectTask;
  refetch: () => void;
}

const TaskInfo = ({ task, refetch }: TaskInfoProps) => {
  const navigate = useNavigate();
  const { project } = useProjectContext();

  return (
    <div className="col-span-4">
      <div className="mt-5 prose prose-stone !prose-sm max-w-full">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b space-y-2 sm:space-y-0 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="space-x-2">
              <Avatar className="bg-primary !text-sm" size={25}>
                {task?.user?.fullName[0].toUpperCase()}
              </Avatar>
              <span className="font-medium text-primary text-xs sm:text-sm">
                {task?.user?.fullName}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-center">
              <div className="flex items-center">
                {<Tag className="px-2 rounded-full">{project?.role}</Tag>}
              </div>
              {(project?.role !== MemberRoles.MEMBER || task?.isCreator) && (
                <div className="flex items-center justify-center space-x-2">
                  <UpdateProjectTask
                    projectTask={task}
                    refetchProjectTask={refetch}
                  />
                  <DeleteProjectTask
                    objectId={task._id}
                    refetchProjectTask={() => {
                      navigate(`/dashboard/projects/${project?._id}/tasks`);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className="px-5 pt-5"
            dangerouslySetInnerHTML={{ __html: task.description }}
          />

          <div className="ml-10">
            <h3 className="text-primary">Sub Tasks</h3>
            <ul className="list-disc">
              {task.subtasks.map(({ title }) => (
                <li>{title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
