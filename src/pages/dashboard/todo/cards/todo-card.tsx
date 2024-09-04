import { Tag } from "antd";
import { MdAccessTime } from "react-icons/md";
import dateFormat from "dateformat";

import DeleteTodo from "../helpers/delete";
import { Todo } from "../../../../types";
import { strSlice } from "../../../../utils";

import { TODO_LEVEL_COLOR, TODO_STATUS_COLOR } from "../../../../constants";
import { TODO_STATUS_ICON } from "../../../../constants/icon";

interface TodoCardProps {
  todo: Todo;
  refetchTodoList: () => {};
}

const TodoCard = ({ todo, refetchTodoList }: TodoCardProps) => {
  return (
    <div className="bg-card p-3 space-y-2 rounded-lg shadow-lg transition-transform transform border hover:bg-gray-100 cursor-pointer">
      <div className="flex items-center space-x-1">
        {TODO_STATUS_ICON[todo.status]}
        <h3 className="flex gap-2 items-center text-black font-medium">
          {strSlice(todo.title, 35)}
        </h3>
      </div>
      <p className="text-gray-700 pb-2 text-sm font-light h-[40px]">
        {strSlice(todo.description, 120)}
      </p>

      <div className="flex">
        <Tag color={TODO_LEVEL_COLOR[todo.level]}>
          {todo.level.toUpperCase()}
        </Tag>
        <Tag color={TODO_STATUS_COLOR[todo.status]}>
          {todo.status.toLocaleUpperCase()}
        </Tag>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="font-light flex items-center space-x-1 text-balck">
          <MdAccessTime />
          <span className="text-xs">
            {dateFormat(new Date(todo.createdAt), "HH:MM")}
          </span>
        </div>
        <DeleteTodo objectId={todo._id} refetchTodoList={refetchTodoList} />
      </div>
    </div>
  );
};

export default TodoCard;
