import { Spin } from "antd";
import { useQuery } from "react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";

import TaskCard from "./task-card";
import { ProjectTask } from "../../../../../types";
import useUserInfo from "../../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import projectTaskService from "../../../../../services/project-task-service";

const RecentProjectTask = () => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const { projectId } = useParams();

  const [projectTaskList, setProjectTaskList] = useState<ProjectTask[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["GET_PROJECT_TASKS"],
    queryFn: () =>
      projectTaskService().getProjectTaskForUser({
        authToken,
        data: { projectId },
      }),
    onSuccess: ({ data }) => {
      const list = data?.message?.projectTasks || [];
      setProjectTaskList(list);
    },
    onError: (error) => {
      console.error("ERROR :: get project task for user ::", error);
      handleError(error);
    },
    retry: false,
  });

  return null;

  if (isLoading)
    return (
      <div className="py-8 flex items-center justify-center">
        <Spin />
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3">
      <div className="flex items-center justify-between mb-4 border-b border-primary/50 pb-3">
        <h1 className="text-primary text-lg font-semibold">
          Recent tasks assigned to you
        </h1>
        <Link
          to={`/dashboard/projects/${projectId}/tasks`}
          className="text-primary hover:text-primary/80"
        >
          <MdOutlineArrowRightAlt />
        </Link>
      </div>
      <div className="overflow-auto space-y-2">
        {projectTaskList.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default RecentProjectTask;
