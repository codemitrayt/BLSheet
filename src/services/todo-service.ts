import urls from "../utils/urls";
import request from "../api";
import { RequestType } from "./../types";

const todoService = () => {
  return {
    getTodoList: ({ authToken, params }: RequestType) =>
      request({
        method: "GET",
        url: urls.todo.getTodoList,
        authToken,
        params,
      }),
    createTodo: ({ data, authToken }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.todo.createTodo,
        authToken,
      }),
    updateTodo: ({ data, authToken, params }: RequestType) =>
      request({
        method: "PUT",
        params,
        data,
        url: urls.todo.updateTodo,
        authToken,
      }),
    deleteTodo: ({ data, authToken, params }: RequestType) => {
      return request({
        method: "DELETE",
        data,
        url: urls.todo.deleteTodo,
        params,
        authToken,
      });
    },
  };
};

export default todoService;
