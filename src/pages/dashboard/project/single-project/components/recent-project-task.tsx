import { Spin } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import AnalyticsCard from "../cards/analytics-card";
import RecentAssignedTasks from "./recent-assigned-tasks";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import projectTaskService from "../../../../../services/project-task-service";
import { ProjectTaskList, ProjectTaskStatus } from "../../../../../types";
import {
  ScrollArea,
  ScrollBar,
} from "../../../../../components/ui/scroll-area";
import ColumnChart from "../../../../../components/charts/column-chart";

const RecentProjectTask = () => {
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const { projectId } = useParams();

  const [projectTaskList, setProjectTaskList] = useState<ProjectTaskList>();

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

  if (isLoading)
    return (
      <div className="py-8 flex items-center justify-center">
        <Spin />
      </div>
    );

  return (
    <div className="space-y-3">
      <div className="rounded-lg overflow-hidden overflow-x-auto">
        <ScrollArea>
          <div className="w-full h-full grid grid-cols-4 min-w-[1000px] px-1 gap-3">
            <AnalyticsCard
              status={ProjectTaskStatus.TODO}
              title="To Do Tasks"
              count={projectTaskList?.todo?.count}
            />
            <AnalyticsCard
              status={ProjectTaskStatus.IN_PROGRESS}
              title="In Progress Tasks"
              count={projectTaskList?.in_progress?.count}
            />
            <AnalyticsCard
              status={ProjectTaskStatus.UNDER_REVIEW}
              title="Under Review Tasks"
              count={projectTaskList?.under_review?.count}
            />
            <AnalyticsCard
              status={ProjectTaskStatus.COMPLETED}
              isLast={true}
              title="Completed Tasks"
              count={projectTaskList?.completed?.count}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="lg:grid lg:grid-cols-2 gap-3 max-w-full space-y-2 lg:space-y-0">
        <RecentAssignedTasks
          tasks={[
            ...(projectTaskList?.todo?.tasks || []),
            ...(projectTaskList?.in_progress?.tasks || []),
          ].slice(0, 6)}
        />

        <div className="border rounded-md h-[400px]">
          <ColumnChart
            title="Task Progress Report"
            data={[
              { type: "To Do", value: projectTaskList?.todo?.count || 0 },
              {
                type: "In Progress",
                value: projectTaskList?.in_progress?.count || 0,
              },
              {
                type: "Under Review",
                value: projectTaskList?.under_review?.count || 0,
              },
              {
                type: "Completed",
                value: projectTaskList?.completed?.count || 0,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentProjectTask;
