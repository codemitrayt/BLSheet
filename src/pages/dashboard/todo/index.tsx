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

  return <ShowTodoList todoList={todoList} refetchTodoList={refetchTodoList} />;
};

export default DashboardTodoPage;
