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

    createTodo: ({ data, authToken}: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.todo.createTodo,
        authToken
      })
  };
};

export default todoService;
