import { Spin } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ShowProjectTask from "./helpers/show";
import CreateProjectTask from "./helpers/create";

import useAuth from "../../../../hooks/useAuth";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import useProjectTaskFilters from "../../../../hooks/useProjectTaskFilters";

import { useSocketProvider } from "../../../../providers/socket-provider";
import { useProjectContext } from "../../../../providers/project-provider";

import { ProjectTask } from "../../../../types";
import ProjectTaskFilters from "../../../../components/filters/project-task-filters";

import projectTaskService from "../../../../services/project-task-service";

const ProjectTasks = () => {
  const socket = useSocketProvider();
  const { projectId } = useParams();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const { project } = useProjectContext();
  const { search, priority, assignedToMe, sortByCreatedAt } =
    useProjectTaskFilters();

  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([]);

  const { isLoading, refetch } = useQuery({
    queryKey: [
      "GET_PROJECT_TASK",
      projectId,
      search,
      priority,
      { sortByCreatedAt, assignedToMe },
    ],
    queryFn: () =>
      projectTaskService().getProjectTasks({
        data: { objectId: projectId },
        authToken,
        params: {
          search,
          priority,
          isSort: sortByCreatedAt,
          isAssignedToMe: assignedToMe,
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
    socket.on("CREATED_TASK", (data) => {
      setProjectTasks((prev: ProjectTask[]) => {
        return [...prev, data];
      });
    });

    return () => {
      socket.off("CREATED_TASK");
    };
  }, [socket]);

  return (
    <div className="relative mt-3">
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-4 border shadow-sm">
        <h1 className="text-primary font-bold">{project?.name}</h1>
        <div className="flex items-center justify-center space-x-4">
          <ProjectTaskFilters />
          <CreateProjectTask refetchProjectTaskList={refetch} />
        </div>
      </div>

      {isLoading && !projectTasks.length ? (
        <div className="py-16 flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="w-[calc(100vw_-100px)] lg:w-[calc(100vw_-290px)] border p-6 rounded-xl shadow-sm">
          <ShowProjectTask
            projectTasks={projectTasks}
            refetchProjectTask={refetch}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectTasks;
