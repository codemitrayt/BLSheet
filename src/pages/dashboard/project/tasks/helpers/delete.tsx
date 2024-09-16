import { TbTrash } from "react-icons/tb";
import { useMutation } from "react-query";
import { Tooltip } from "antd";
import { RiLoader4Line } from "react-icons/ri";

import useUserInfo from "../../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import ConfirmationPopUp from "../../../../../components/ui/confirmation-popup";
import projectTaskService from "../../../../../services/project-task-service";

interface DeleteProjectTaskProps {
  objectId: string;
  refetchProjectTask: () => void;
}

const DeleteProjectTask = ({
  objectId,
  refetchProjectTask,
}: DeleteProjectTaskProps) => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["delete-project-task"],
    mutationFn: () =>
      projectTaskService().deleteProjectTask({
        authToken,
        params: { objectId },
      }),
    onSuccess: () => refetchProjectTask(),
    onError: (error) => {
      console.error("ERROR :: delete Project Task ::", error);
      handleError(error);
    },
    retry: false,
  });

  const handleOnDelete = () => mutate();

  return (
    <ConfirmationPopUp
      title="Delete Project"
      description="Are you sure to delete this project?"
      fn={handleOnDelete}
      icon={
        <div className="flex items-center justify-center h-5 mr-2">
          <TbTrash className="text-red-500" />
        </div>
      }
      isLoading={isLoading}
    >
      <Tooltip title="Delete Project">
        <button className="text-red-500 hover:text-red-500/80 transition">
          {isLoading ? <RiLoader4Line className="animate-spin" /> : <TbTrash />}
        </button>
      </Tooltip>
    </ConfirmationPopUp>
  );
};

export default DeleteProjectTask;
