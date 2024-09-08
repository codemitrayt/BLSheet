import { Todo } from "../../../../../types";
import TodoCardForDesktop from "../../cards/todo-card-for-desktop";

interface DesktopTodoListProps {
  todoList: Todo[];
  refetchTodoList: () => void;
}
const DesktopTodoList = ({
  todoList,
  refetchTodoList,
}: DesktopTodoListProps) => {
  return (
    <div className="hidden xl:block relative h-[calc(100vh_-130px)] border bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-3 gap-4 font-medium text-primary bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden px-6 py-2">
        <h1 className="p-1 w-full text-center">Todo</h1>
        <h1 className="p-1 w-full text-center">Doing</h1>
        <h1 className="p-1 w-full text-center">Completed</h1>
      </div>

      <div className="flex justify-between h-[calc(100vh_-220px)] gap-4 m-6">
        <div className="flex flex-col space-y-3 w-full overflow-y-auto h-full">
          {todoList
            .filter((todo) => todo.status === "pending")
            .map((todo) => (
              <TodoCardForDesktop
                todo={todo}
                key={todo._id}
                refetchTodoList={refetchTodoList}
              />
            ))}
        </div>
        <div className="flex flex-col space-y-3 w-full overflow-y-auto h-full">
          {todoList
            .filter((todo) => todo.status === "in_progress")
            .map((todo) => (
              <TodoCardForDesktop
                todo={todo}
                key={todo._id}
                refetchTodoList={refetchTodoList}
              />
            ))}
        </div>
        <div className="flex flex-col space-y-3 w-full overflow-y-auto h-full">
          {todoList
            .filter((todo) => todo.status === "completed")
            .map((todo) => (
              <TodoCardForDesktop
                todo={todo}
                key={todo._id}
                refetchTodoList={refetchTodoList}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopTodoList;
