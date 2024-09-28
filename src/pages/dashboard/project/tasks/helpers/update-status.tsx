import { Button, Dropdown } from "antd";
import { AiOutlineEllipsis } from "react-icons/ai";

import { ProjectTask, ProjectTaskStatus } from "../../../../../types";
import { useMutation } from "react-query";
import projectTaskService from "../../../../../services/project-task-service";
import useUserInfo from "../../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../../hooks/useErrorHandler";

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
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

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

  const items = [
    {
      key: "1",
      label: (
        <button
          className="w-full text-start"
          onClick={() => handleUpdateStatus(ProjectTaskStatus.TODO)}
        >
          📋 TO DO
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          className="w-full text-start"
          onClick={() => handleUpdateStatus(ProjectTaskStatus.IN_PROGRESS)}
        >
          🧑🏻‍💻 Working In Progress
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          className="w-full text-start"
          onClick={() => handleUpdateStatus(ProjectTaskStatus.UNDER_REVIEW)}
        >
          👀 Under Review
        </button>
      ),
    },
    {
      key: "4",
      label: (
        <button
          className="w-full text-start"
          onClick={() => handleUpdateStatus(ProjectTaskStatus.COMPLETED)}
        >
          ✅ Completed
        </button>
      ),
    },
  ];

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
