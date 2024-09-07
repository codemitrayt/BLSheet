import { useQuery } from "react-query";
import { useState } from "react";
import { Spin } from "antd";

import CreateTodo from "./helpers/create";

import useUserInfo from "../../../hooks/useUserInfo";
import useErrorHandler from "../../../hooks/useErrorHandler";

import todoService from "../../../services/todo-service";

import DesktopTodoList from "./components/desktop-todo-list";
import MobileTodoList from "./components/mobile-todo-list";

import { Todo } from "../../../types";
import TodoFilters from "../../../components/todo-filters";
import useTodoFilters from "../../../hooks/userTodoFilters";

const DashboardTodoPage = () => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const { date } = useTodoFilters();

  const { refetch: refetchTodoList, isLoading } = useQuery({
    queryKey: ["todo-list", date],
    queryFn: () => todoService().getTodoList({ authToken, params: { date } }),
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

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2 border shadow-sm">
        <TodoFilters />
        <CreateTodo refetchTodoList={refetchTodoList} />
      </div>

      {isLoading ? (
        <div className="py-16 flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <>
          <DesktopTodoList
            todoList={todoList}
            refetchTodoList={refetchTodoList}
          />
          <MobileTodoList
            todoList={todoList}
            refetchTodoList={refetchTodoList}
          />
        </>
      )}
    </div>
  );
};

export default DashboardTodoPage;
