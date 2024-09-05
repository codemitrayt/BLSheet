import { useQuery } from "react-query";
import { useState } from "react";
import { Spin } from "antd";

import useUserInfo from "../../../hooks/useUserInfo";
import useErrorHandler from "../../../hooks/useErrorHandler";
import todoService from "../../../services/todo-service";
import ShowTodoList from "./helpers/show";
import { Todo } from "../../../types";

const DashboardTodoPage = () => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const { refetch: refetchTodoList, isLoading } = useQuery({
    queryKey: ["todo-list"],
    queryFn: () => todoService().getTodoList({ authToken }),
    onSuccess: ({ data }) => {
      const todoList = data?.message?.todoList || [];
      setTodoList(todoList);
    },
    onError: (error) => {
      console.log("ERROR :: todo-list ::", error);
      handleError(error);
    },
    retry: false,
  });

  if (isLoading)
    return (
      <div className="py-16 flex items-center justify-center">
        <Spin />
      </div>
    );

  return (
    <div className="relative h-full border bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-3 gap-4 font-medium text-primary bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden px-6 py-2">
        <h1 className="p-1 w-full text-center">Todo</h1>
        <h1 className="p-1 w-full text-center">Doing</h1>
        <h1 className="p-1 w-full text-center">Completed</h1>
      </div>

      <div className="flex justify-between h-[calc(100vh_-200px)] gap-4 m-6">
        <div className="flex flex-col space-y-3 w-full overflow-y-auto h-full">
          <ShowTodoList
            todoList={todoList.filter((todo) => todo.status === "pending")}
            refetchTodoList={refetchTodoList}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full overflow-y-auto h-full">
          <ShowTodoList
            todoList={todoList.filter((todo) => todo.status === "in_progress")}
            refetchTodoList={refetchTodoList}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full overflow-y-auto h-full">
          <ShowTodoList
            todoList={todoList.filter((todo) => todo.status === "completed")}
            refetchTodoList={refetchTodoList}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTodoPage;
