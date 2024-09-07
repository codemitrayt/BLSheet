import { Badge, Tag } from "antd";

import UpdateTodo from "../helpers/update";
import DeleteTodo from "../helpers/delete";
import { Todo } from "../../../../types";

import { TODO_LEVEL_COLOR, TODO_STATUS_COLOR } from "../../../../constants";
import TodoDetailsDrawer from "./todo-details-drawer";

interface TodoCardForMobileProps {
  todo: Todo;
  refetchTodoList: () => void;
}
const TodoCardForMobile = ({
  todo,
  refetchTodoList,
}: TodoCardForMobileProps) => {
  return (
    <div className="flex flex-col border p-3 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 h-[30px] md:h-[40px]">
          <Badge color={TODO_LEVEL_COLOR[todo.level]} />
          <h1 className="text-primary font-medium text-xs sm:text-sm">
            {todo.title}
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Tag
          className="w-[80px] !text-[9px] flex items-center justify-center rounded-full"
          color={TODO_STATUS_COLOR[todo.status]}
        >
          {todo.status.toLocaleUpperCase()}
        </Tag>

        <div className="flex items-center justify-center space-x-3">
          <TodoDetailsDrawer todo={todo} />
          <UpdateTodo todo={todo} refetchTodoList={refetchTodoList} />
          <DeleteTodo objectId={todo._id} refetchTodoList={refetchTodoList} />
        </div>
      </div>
    </div>
  );
};

export default TodoCardForMobile;
