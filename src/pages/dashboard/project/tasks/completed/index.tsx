import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

import ProjectTaskFilters from "../../../../../components/filters/project-task-filters";
import BackButton from "../../../../../components/shared/back-button";
import ProjectTaskCard from "../cards/project-task-card";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import useProjectTaskFilters from "../../../../../hooks/useProjectTaskFilters";

import { useProjectContext } from "../../../../../providers/project-provider";

import projectTaskService from "../../../../../services/project-task-service";

import { ProjectTaskList } from "../../../../../types";

const CompletedTaks = () => {
  const { project } = useProjectContext();
  const { projectId } = useParams();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const { search, priority, assignedToMe, sortByCreatedAt, createdByMe } =
    useProjectTaskFilters();

  const [projectTasks, setProjectTasks] = useState<ProjectTaskList>();

  const { isLoading, refetch } = useQuery({
    queryKey: [
      "GET_COMPLETED_PROJECT_TASK",
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
          search,
          priority,
          isSort: sortByCreatedAt,
          isAssignedToMe: assignedToMe,
          isCreatedByMe: createdByMe,
          onlyCompleted: true,
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

  return (
    <div className="relative mt-3">
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-4 border shadow-sm">
        <div className="flex items-center space-x-2 justify-center">
          <BackButton
            redirectUrl={`/dashboard/projects/${project?._id}/tasks`}
            iconClassName="size-5"
          />
          <h1 className="text-primary font-bold">
            {project?.name} Completed Tasks
            <div className="bg-primary text-white px-3 py-[1px] text-sm ml-1 inline-block rounded-full">
              {projectTasks?.completed?.count || 0}
            </div>
          </h1>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <ProjectTaskFilters />
        </div>
      </div>

      {!projectTasks || Object.keys(projectTasks!).length === 0 ? (
        <div className="py-16 flex items-center justify-center">
          <p>No tasks found.</p>
        </div>
      ) : isLoading && !Object.keys(projectTasks!).length ? (
        <div className="py-16 flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="h-[calc(100vh_-150px)] pb-20 scroll-smooth overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-4">
            {(projectTasks?.completed?.tasks || []).map((task) => (
              <ProjectTaskCard
                key={task._id}
                projectTask={task}
                refetchProjectTask={refetch}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedTaks;
