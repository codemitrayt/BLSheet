import { Spin } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";

import { ProjectTask } from "../../../../../types";
import queryKeys from "../../../../../constants/query-keys";
import BackButton from "../../../../../components/shared/back-button";
import projectTaskService from "../../../../../services/project-task-service";

import TaskHeader from "./components/task-header";
import TaskInfo from "./components/task-info";
import TaskDataCard from "./components/task-data-card";

const SingleTask = () => {
  const { authToken } = useAuth();
  const [task, setTask] = useState<ProjectTask>();
  const { handleError } = useErrorHandler();
  const { projectId, taskId } = useParams();

  const { isLoading, refetch } = useQuery({
    queryKey: [queryKeys.projectTask, taskId],
    queryFn: () =>
      projectTaskService().getProjectTask({
        authToken,
        params: { projectId, taskId },
      }),
    onSuccess: ({ data }) => {
      setTask(data?.message?.task);
    },
    onError: (error) => {
      handleError(error);
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spin />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center py-8">
        Task Not Found
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="h-[calc(100vh_-100px)] overflow-y-auto pb-20 scroll-smooth pt-3">
        <div className="absolute top-4 left-4 hidden sm:block">
          <BackButton redirectUrl={`/dashboard/projects/${projectId}/tasks`} />
        </div>

        <div className="sm:px-6 sm:w-[90%] mx-auto">
          <TaskHeader
            title={task.title}
            dueDate={task.endDate}
            status={task.status}
            tags={task.tags}
          />
          <div className="space-y-5 md:grid grid-cols-6 md:space-x-8">
            <TaskInfo task={task} refetch={refetch} />
            <TaskDataCard task={task} refetch={refetch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
