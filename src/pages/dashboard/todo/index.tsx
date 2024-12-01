import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Spin } from "antd";

import CreateTodo from "./helpers/create";

import useAuth from "../../../hooks/useAuth";
import useErrorHandler from "../../../hooks/useErrorHandler";

import todoService from "../../../services/todo-service";

import DesktopTodoList from "./helpers/show/desktop-todo-list";
import MobileTodoList from "./helpers/show/mobile-todo-list";

import { Todo } from "../../../types";
import TodoFilters from "../../../components/filters/todo-filters";
import useTodoFilters from "../../../hooks/userTodoFilters";
import DottedSeparator from "../../../components/ui/dotted-separator";

const DashboardTodoPage = () => {
  const { authToken } = useAuth();
  const { handleError } = useErrorHandler();
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const { date } = useTodoFilters();

  useEffect(() => {
    document.title = "Todos - BL Sheet";
  }, []);

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
      {/* bg-gray-100 rounded-lg mb-2 border shadow-sm p-3 */}
      <div className="flex items-center justify-between">
        <TodoFilters />
        <CreateTodo refetchTodoList={refetchTodoList} />
      </div>
      <DottedSeparator className="my-4" />

      {isLoading ? (
        <div className="py-16 flex items-center justify-center">
          <Spin />
        </div>
      ) : todoList?.length === 0 ? (
        <div className="py-16 flex items-center justify-center text-primary font-semibold">
          No Todo Yet? Get Started by Creating Your First One!
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
