import { Button, Dropdown } from "antd";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useMutation } from "react-query";

import { ProjectTask, ProjectTaskStatus } from "../../../../../types";
import projectTaskService from "../../../../../services/project-task-service";
import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import { useProjectContext } from "../../../../../providers/project-provider";

interface UpdateStatus {
  projectTask: ProjectTask;
  refetchProjectTask: () => void;
}

const StatusMap = {
  todo: "📋 TO DO",
  in_progress: "🧑🏻‍💻 Working In Progress",
  under_review: "👀 Under Review",
  completed: "✅ Completed",
};

const UpdateStatus = ({ projectTask, refetchProjectTask }: UpdateStatus) => {
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const { isAdmin } = useProjectContext();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["update-project-task"],
    mutationFn: ({ data }: { data: ProjectTask }) =>
      projectTaskService().updateProjectTask({
        data,
        authToken,
        params: { objectId: projectTask._id },
      }),
    onSuccess: () => {
      refetchProjectTask();
    },
    onError: (error) => {
      console.error("ERROR :: update Project Task ::", error);
      handleError(error);
    },
    retry: false,
  });

  const handleUpdateStatus = (status: ProjectTaskStatus) => {
    mutate({
      data: { ...projectTask, status },
    });
  };

  const todo = {
    key: "1",
    label: (
      <button
        className="w-full text-start"
        onClick={() => handleUpdateStatus(ProjectTaskStatus.TODO)}
      >
        📋 TO DO
      </button>
    ),
  };

  const inProgress = {
    key: "2",
    label: (
      <button
        className="w-full text-start"
        onClick={() => handleUpdateStatus(ProjectTaskStatus.IN_PROGRESS)}
      >
        🧑🏻‍💻 Working In Progress
      </button>
    ),
  };

  const underReview = {
    key: "3",
    label: (
      <button
        className="w-full text-start"
        onClick={() => handleUpdateStatus(ProjectTaskStatus.UNDER_REVIEW)}
      >
        👀 Under Review
      </button>
    ),
  };

  const completed = {
    key: "4",
    label: (
      <button
        className="w-full text-start"
        onClick={() => handleUpdateStatus(ProjectTaskStatus.COMPLETED)}
      >
        ✅ Completed
      </button>
    ),
  };

  const items = isAdmin
    ? [todo, inProgress, underReview, completed]
    : projectTask.status === ProjectTaskStatus.TODO
    ? [inProgress, underReview]
    : projectTask.status === ProjectTaskStatus.IN_PROGRESS
    ? [underReview]
    : [];

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottom"
      arrow
    >
      <Button
        className="flex items-center w-full justify-between"
        loading={isLoading}
      >
        <span>{StatusMap[projectTask.status]}</span>
        <span className="ml-2">
          <AiOutlineEllipsis />
        </span>
      </Button>
    </Dropdown>
  );
};

export default UpdateStatus;
