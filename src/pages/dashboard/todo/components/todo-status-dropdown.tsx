import { Button, Dropdown } from "antd";
import { Todo, TodoStatus } from "../../../../types";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useMutation } from "react-query";
import todoService from "../../../../services/todo-service";
import useUserInfo from "../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../hooks/useErrorHandler";

interface TodoStatusDropdownProps {
  todo: Todo;
  refetchTodoList: () => void;
}

const TodoStatusDropdown = ({
  todo,
  refetchTodoList,
}: TodoStatusDropdownProps) => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();

  const { mutate: updateTodo, isLoading } = useMutation({
    mutationKey: ["update-todo"],
    mutationFn: ({ status }: { status: TodoStatus }) =>
      todoService().updateTodo({
        authToken,
        data: { ...todo, status },
        params: { objectId: todo._id },
      }),
    onSuccess: () => {
      refetchTodoList();
    },
    onError: (error) => {
      console.error("ERROR :: update Todo ::", error);
      handleError(error);
    },
    retry: false,
  });

  const items = [
    {
      key: "1",
      label: (
        <button onClick={() => updateTodo({ status: TodoStatus.PENDING })}>
          Pending
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button onClick={() => updateTodo({ status: TodoStatus.IN_PROGRESS })}>
          In Progress
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button onClick={() => updateTodo({ status: TodoStatus.COMPLETED })}>
          Completed
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
      <Button className="flex items-center justify-center" loading={isLoading}>
        {todo.status}
        <span className="ml-2">
          <AiOutlineEllipsis />
        </span>
      </Button>
    </Dropdown>
  );
};

export default TodoStatusDropdown;
