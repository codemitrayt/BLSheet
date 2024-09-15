import { Spin } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

import ShowProjectTask from "./helpers/show";
import projectTaskService from "../../../../services/project-task-service";
import useUserInfo from "../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../hooks/useErrorHandler";

const ProjectTasks = () => {
  const { projectId } = useParams();
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

  const [projectTasks, setProjectTasks] = useState([]);

  const { isLoading, refetch } = useQuery({
    queryKey: ["get-project-tasks", projectId],
    queryFn: () =>
      projectTaskService().getProjectTasks({ data: { projectId }, authToken }),
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
        <h1 className="text-primary font-bold">Tasks</h1>
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
