import TodoCard from "../cards/todo-card";
import { Todo } from "../../../../types";

interface ShowTodoProps {
  todoList: Todo[];
  refetchTodoList: () => {};
}

const ShowTodoList = ({ todoList, refetchTodoList }: ShowTodoProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {todoList.map((todo) => (
        <TodoCard todo={todo} refetchTodoList={refetchTodoList} />
      ))}
    </div>
  );
};

export default ShowTodoList;
