import BoardView from "./board-view";
import CalendarView from "./calendar-view";
import TableView from "./table-view";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import useProjectTaskFilters from "../../../../../hooks/useProjectTaskFilters";
import projectTaskService from "../../../../../services/project-task-service";

import { ProjectTask } from "../../../../../types";
import { useSocketProvider } from "../../../../../providers/socket-provider";

const Views = ({ isHideFilters }: { isHideFilters: boolean }) => {
  const socket = useSocketProvider();
  const { projectId } = useParams();
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const { search, priority, assignedToMe, sortByCreatedAt, createdByMe, view } =
    useProjectTaskFilters();

  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>();

  const { isLoading, refetch } = useQuery({
    queryKey: [
      "GET_PROJECT_TASK_LIST",
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
          isGroup: false,
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
      setProjectTasks((prev: any) => [data, ...prev]);
    });

    return () => {
      socket.off("CREATED_TASK");
    };
  }, [socket]);

  if (isLoading) {
    return (
      <div className="py-8 flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <>
      {view === "board" ? (
        <BoardView isHideFilters={isHideFilters} />
      ) : view === "table" ? (
        <TableView
          refetch={refetch}
          tasks={projectTasks ?? []}
          isHideFilters={isHideFilters}
        />
      ) : (
        <CalendarView
          refetch={refetch}
          tasks={projectTasks ?? []}
          isHideFilters={isHideFilters}
        />
      )}
    </>
  );
};

export default Views;
