import urls from "../utils/urls";
import request from "../api";
import { RequestType } from "./../types";

const projectService = () => {
  return {
    getProjectList: ({ authToken, params }: RequestType) =>
      request({
        method: "GET",
        url: urls.project.getProjectList,
        authToken,
        params,
      }),

    createProject: ({ data, authToken }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.project.createProject,
        authToken,
      }),

    deleteBLSheet: ({ data, authToken }: RequestType) =>
      request({
        method: "DELETE",
        data,
        url: urls.project.deleteProject,
        authToken,
      }),

    updateProject: ({ data, authToken, params }: RequestType) =>
      request({
        method: "PUT",
        params,
        data,
        url: urls.project.updateProject,
        authToken,
      }),
  };
};

export default projectService;
