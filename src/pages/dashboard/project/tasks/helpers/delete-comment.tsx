import { TbTrash } from "react-icons/tb";
import { useMutation } from "react-query";
import { RiLoader4Line } from "react-icons/ri";

import useAuth from "../../../../../hooks/useAuth";
import useErrorHandler from "../../../../../hooks/useErrorHandler";
import ConfirmationPopUp from "../../../../../components/ui/confirmation-popup";
import projectTaskService from "../../../../../services/project-task-service";
import queryKeys from "../../../../../constants/query-keys";

interface DeleteProjectTaskCommentProps {
  projectId: string;
  projectTaskId: string;
  commentId: string;
  refetchComments: () => void;
  parentCommentId?: string;
}

const DeleteComment = ({
  projectId,
  projectTaskId,
  commentId,
  refetchComments,
  parentCommentId,
}: DeleteProjectTaskCommentProps) => {
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();

  const { isLoading, mutate } = useMutation({
    mutationKey: [queryKeys.projectTask.deleteProjectTaskComment],
    mutationFn: () =>
      projectTaskService().deleteProjectTaskComment({
        authToken,
        data: {
          projectTaskId,
          projectId,
          commentId,
          ...(parentCommentId && { parentCommentId }),
        },
      }),
    onSuccess: () => refetchComments(),
    onError: (error) => {
      console.error("ERROR :: Delete Project Task Comment ::", error);
      handleError(error);
    },
    retry: false,
  });

  const handleOnDelete = () => mutate();

  return (
    <div className="absolute right-[0] top-0">
      <ConfirmationPopUp
        title="Delete Comment"
        description="Are you sure to delete comment?"
        fn={handleOnDelete}
        icon={
          <div className="flex items-center justify-center h-5 mr-2">
            <TbTrash className="text-red-500" />
          </div>
        }
        isLoading={isLoading}
      >
        <button className="text-red-500 hover:text-red-500/80 transition">
          {isLoading ? <RiLoader4Line className="animate-spin" /> : <TbTrash />}
        </button>
      </ConfirmationPopUp>
    </div>
  );
};

export default DeleteComment;
