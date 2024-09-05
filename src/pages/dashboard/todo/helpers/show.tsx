import TodoCard from "../cards/todo-card";
import { Todo } from "../../../../types";

interface ShowTodoProps {
  todoList: Todo[];
  refetchTodoList: () => {};
}

const ShowTodoList = ({ todoList, refetchTodoList }: ShowTodoProps) => {
  return (
    <>
      {todoList.map((todo) => (
        <TodoCard todo={todo} refetchTodoList={refetchTodoList} />
      ))}
    </>
  );
};

export default ShowTodoList;
