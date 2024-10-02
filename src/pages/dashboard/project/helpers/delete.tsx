import { useMutation } from "react-query";
import { Tooltip } from "antd";
import { TbTrash } from "react-icons/tb";
import { RiLoader4Line } from "react-icons/ri";

import useAuth from "../../../../hooks/useAuth";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import projectService from "../../../../services/project-service";
import ConfirmationPopUp from "../../../../components/ui/confirmation-popup";

interface DeleteProjectProps {
  objectId: string;
  refetchProjectList: () => void;
}

const DeleteProject = ({
  objectId,
  refetchProjectList,
}: DeleteProjectProps) => {
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: ({ data }: { data: { objectId: string } }) =>
      projectService().deleteProject({ data, authToken }),
    onSuccess: () => {
      refetchProjectList();
    },
    onError: (error) => {
      console.error("ERROR :: delete Project ::", error);
      handleError(error);
    },
    retry: false,
  });

  const handleOnDelete = () => {
    mutate({ data: { objectId } });
  };

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

export default DeleteProject;
