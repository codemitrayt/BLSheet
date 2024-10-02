import { Spin } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Project, ProjectTask } from "../../../../types";
import ShowProjectTask from "./helpers/show";
import CreateProjectTask from "./helpers/create";
import useAuth from "../../../../hooks/useAuth";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import projectTaskService from "../../../../services/project-task-service";
import { useSocketProvider } from "../../../../providers/socket-provider";

const ProjectTasks = () => {
  const socket = useSocketProvider();
  const { projectId } = useParams();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();

  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([]);
  const [project, setProject] = useState<Project>();

  const { isLoading, refetch } = useQuery({
    queryKey: ["GET_PROJECT_TASK", projectId],
    queryFn: () =>
      projectTaskService().getProjectTasks({
        data: { objectId: projectId },
        authToken,
      }),
    onSuccess: ({ data }) => {
      const tasks = data?.message?.projectTasks || [];
      const project = data?.message?.project || null;
      setProjectTasks(tasks);
      setProject(project);
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

  if (isLoading) {
    return (
      <div className="py-16 flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="relative mt-3">
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-4 border shadow-sm">
        <h1 className="text-primary font-bold">
          {project?.name} Project Tasks
        </h1>
        <CreateProjectTask refetchProjectTaskList={refetch} />
      </div>

      <div className="w-[calc(100vw_-100px)] lg:w-[calc(100vw_-290px)] border p-6 rounded-xl shadow-sm">
        <ShowProjectTask
          projectTasks={projectTasks}
          refetchProjectTask={refetch}
        />
      </div>
    </div>
  );
};

export default ProjectTasks;
