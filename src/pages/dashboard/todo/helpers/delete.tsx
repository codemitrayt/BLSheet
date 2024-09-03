import { useMutation } from "react-query";
import useUserInfo from "../../../../hooks/useUserInfo";
import { Todo } from "../../../../types";
import todoService from "../../../../services/todo-service";
import ConfirmationPopUp from "../../../../components/ui/confirmation-popup";
import { TbTrash } from "react-icons/tb";
import { Tooltip } from "antd";
import { RiLoader4Line } from "react-icons/ri";

interface TodoCardProps {
  objectId: string;
  refetchTodoList: () => {};
}
const DeleteTodo = ({ objectId, refetchTodoList }: TodoCardProps) => {
  const { authToken } = useUserInfo();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["delete"],
    mutationFn: ({ data }: { data: { objectId: string } }) =>
      todoService().deleteTodo({ data, authToken }),
    onSuccess: () => {
      refetchTodoList();
    },
    onError: (error) => {
      console.error("ERROR :: delete Todo ::", error);
    },
    retry: false,
  });
  const handleDelete = () => {
    mutate({ data: { objectId } });
  };
  return (
    <>
      <ConfirmationPopUp
        title="Delete BL Sheet"
        description="Are you sure to delete this sheet?"
        fn={handleDelete}
        icon={
          <div className="flex items-center justify-center h-5 mr-2">
            <TbTrash className="text-red-500" />
          </div>
        }
        isLoading={isLoading}
      >
        <Tooltip title="Delete sheet">
          <button className="text-red-500 hover:text-red-500/80 transition">
            {isLoading ? (
              <RiLoader4Line className="animate-spin" />
            ) : (
              <TbTrash />
            )}
          </button>
        </Tooltip>
      </ConfirmationPopUp>
    </>
  );
};

export default DeleteTodo;
