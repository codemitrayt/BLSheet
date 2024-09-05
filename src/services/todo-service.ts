import urls from "../utils/urls";
import request from "../api";
import { RequestType } from "./../types";

const todoService = () => {
  return {
    getTodoList: ({ authToken }: RequestType) =>
      request({
        method: "GET",
        url: urls.todo.getTodoList,
        authToken,
      }),

    updateTodoList: ({ data, authToken, params }: RequestType) =>
      request({
        method: "PUT",
        params,
        data,
        url: urls.todo.updateTodoList,
        authToken,
      }),
  };
};

export default todoService;
