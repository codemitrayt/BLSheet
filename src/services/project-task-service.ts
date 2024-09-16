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

    updateProjectTask: ({ data, authToken, params }: RequestType) =>
      request({
        method: "PUT",
        data,
        url: urls.projectTask.updateProjectTask,
        authToken,
        params,
      }),

    deleteProjectTask: ({ authToken, params }: RequestType) =>
      request({
        method: "DELETE",
        url: urls.projectTask.deleteProjectTask,
        authToken,
        params,
      }),
  };
};

export default projectTaskService;
