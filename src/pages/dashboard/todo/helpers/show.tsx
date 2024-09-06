import TodoCard from "../cards/todo-card";
import { Todo } from "../../../../types";

interface ShowTodoProps {
  todoList: Todo[];
  refetchTodoList: () => void;
}

const ShowTodoList = ({ todoList, refetchTodoList }: ShowTodoProps) => {
  return (
    <>
      {todoList.map((todo) => (
        <TodoCard
          todo={todo}
          key={todo._id}
          refetchTodoList={refetchTodoList}
        />
      ))}
    </>
  );
};

export default ShowTodoList;
