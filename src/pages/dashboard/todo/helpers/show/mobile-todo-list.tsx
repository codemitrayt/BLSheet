import { Todo } from "../../../../../types";
import TodoCardForMobile from "../../cards/todo-card-for-mobile";

interface MobileTodoListProps {
  todoList: Todo[];
  refetchTodoList: () => void;
}

const MobileTodoList = ({ todoList, refetchTodoList }: MobileTodoListProps) => {
  return (
    <div className="sm:border rounded-lg xl:hidden relative h-[calc(100vh_-130px)] p-2 sm:p-6 overflow-y-auto">
      <div className="space-y-2 pb-4 border-b border-primary">
        <h1 className="underline p-1 w-full text-primary font-medium">Todo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todoList
            .filter((todo) => todo.status === "pending")
            .map((todo) => (
              <TodoCardForMobile
                todo={todo}
                key={todo._id}
                refetchTodoList={refetchTodoList}
              />
            ))}
        </div>
      </div>

      <div className="space-y-2 pb-4 border-b border-primary">
        <h1 className="p-1 w-full underline text-primary font-medium">Doing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todoList
            .filter((todo) => todo.status === "in_progress")
            .map((todo) => (
              <TodoCardForMobile
                todo={todo}
                key={todo._id}
                refetchTodoList={refetchTodoList}
              />
            ))}
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="underline p-1 w-full text-primary font-medium">
          Completed
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todoList
            .filter((todo) => todo.status === "completed")
            .map((todo) => (
              <TodoCardForMobile
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

export default MobileTodoList;
