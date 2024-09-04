import { Tag } from "antd";
import { RiProgress1Line } from "react-icons/ri";

import { Todo } from "../../../../types";
import DeleteTodo from "../helpers/delete";

interface TodoCardProps {
  todo: Todo;

  refetchTodoList: () => {};
}

const TodoCard = ({ todo, refetchTodoList }: TodoCardProps) => {
  return (
    <div className="bg-card p-3 space-y-2 rounded-lg shadow-lg transition-transform transform border hover:bg-gray-100 cursor-pointer">
      <div className="flex items-center space-x-1">
        <RiProgress1Line className="text-primary size-4" />
        <h3 className="flex gap-2 items-center text-primary font-medium">
          {todo.title}
        </h3>
      </div>
      <p className="text-gray-700 pb-2 text-sm font-light">
        {todo.description}
      </p>

      <div className="flex">
        <Tag color="green">{todo.level}</Tag>
        <Tag color="red">{todo.status}</Tag>
      </div>

      <div className="flex items-center justify-end">
        <DeleteTodo objectId={todo._id} refetchTodoList={refetchTodoList} />
      </div>
    </div>
  );
};

export default TodoCard;
