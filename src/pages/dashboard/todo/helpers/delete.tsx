import { useMutation } from "react-query";
import { Tooltip } from "antd";
import { TbTrash } from "react-icons/tb";
import { RiLoader4Line } from "react-icons/ri";

import useUserInfo from "../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import todoService from "../../../../services/todo-service";
import ConfirmationPopUp from "../../../../components/ui/confirmation-popup";

interface DeleteTodoProps {
  objectId: string;
  refetchTodoList: () => {};
}

const DeleteTodo = ({ objectId, refetchTodoList }: DeleteTodoProps) => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["delete"],
    mutationFn: ({ data }: { data: { objectId: string } }) =>
      todoService().deleteTodo({ data, authToken }),
    onSuccess: () => {
      refetchTodoList();
    },
    onError: (error) => {
      console.error("ERROR :: delete Todo ::", error);
      handleError(error);
    },
    retry: false,
  });

  const handleOnDelete = () => {
    mutate({ data: { objectId } });
  };

  return (
    <ConfirmationPopUp
      title="Delete Todo"
      description="Are you sure to delete this todo?"
      fn={handleOnDelete}
      icon={
        <div className="flex items-center justify-center h-5 mr-2">
          <TbTrash className="text-red-500" />
        </div>
      }
      isLoading={isLoading}
    >
      <Tooltip title="Delete Todo">
        <button className="text-red-500 hover:text-red-500/80 transition">
          {isLoading ? <RiLoader4Line className="animate-spin" /> : <TbTrash />}
        </button>
      </Tooltip>
    </ConfirmationPopUp>
  );
};

export default DeleteTodo;
