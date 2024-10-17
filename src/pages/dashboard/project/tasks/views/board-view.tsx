import { message, Spin } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ShowProjectTask from "./../helpers/show";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import useProjectTaskFilters from "../../../../../hooks/useProjectTaskFilters";
import projectTaskService from "../../../../../services/project-task-service";

import { useSocketProvider } from "../../../../../providers/socket-provider";
import { ProjectTask, ProjectTaskList } from "../../../../../types";

const BoardView = ({ isHideFilters }: { isHideFilters: boolean }) => {
  const socket = useSocketProvider();
  const { projectId } = useParams();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const { search, priority, assignedToMe, sortByCreatedAt, createdByMe } =
    useProjectTaskFilters();

  const [projectTasks, setProjectTasks] = useState<ProjectTaskList>();

  const { isLoading, refetch } = useQuery({
    queryKey: [
      "GET_PROJECT_TASK",
      projectId,
      search,
      priority,
      { sortByCreatedAt, assignedToMe, createdByMe },
    ],
    queryFn: () =>
      projectTaskService().getProjectTasks({
        data: { objectId: projectId },
        authToken,
        params: {
          isGroup: true,
          search,
          priority,
          isSort: sortByCreatedAt,
          isAssignedToMe: assignedToMe,
          isCreatedByMe: createdByMe,
        },
      }),
    onSuccess: ({ data }) => {
      const tasks = data?.message?.projectTasks || [];
      setProjectTasks(tasks);
    },
    onError: (error) => {
      console.log("Error :: get project tasks ::", error);
      handleError(error);
    },
    retry: false,
  });

  useEffect(() => {
    socket.on("CREATED_TASK", (data: ProjectTask) => {
      message.open({
        type: "success",
        content: `Task created by ${data?.user?.fullName}`,
        duration: 5,
        className: "absolute top-11 right-4",
      });

      setProjectTasks((prev: any) => {
        if (!prev[data?.status]) {
          return { ...prev, [data?.status]: { count: 1, tasks: [data] } };
        }

        return {
          ...prev,
          [data?.status]: {
            count: prev[data?.status]?.count + 1,
            tasks: [data, ...prev[data?.status]?.tasks],
          },
        };
      });
    });

    return () => {
      socket.off("CREATED_TASK");
    };
  }, [socket]);

  if (isLoading) {
    return (
      <div className="py-16 flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (!projectTasks || Object.keys(projectTasks!).length === 0) {
    return (
      <div className="py-16 flex items-center justify-center">
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="w-[calc(100vw_-100px)] lg:w-[calc(100vw_-290px)] p-2">
      <ShowProjectTask
        projectTasks={projectTasks}
        refetchProjectTask={refetch}
        isHideFilters={isHideFilters}
      />
    </div>
  );
};

export default BoardView;
