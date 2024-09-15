import { RequestType } from "./../types";
import urls from "../utils/urls";
import request from "../api";

const projectTaskService = () => {
  return {
    createProjectTask: ({ data, authToken }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.projectTask.createProjectTask,
        authToken,
      }),

    getProjectTasks: ({ data, authToken }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.projectTask.getProjectTasks,
        authToken,
      }),
  };
};

export default projectTaskService;
