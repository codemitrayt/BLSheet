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
