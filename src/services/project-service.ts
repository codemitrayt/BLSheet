import urls from "../utils/urls";
import request from "../api";
import { RequestType } from "./../types";

const projectService = () => {
  return {
    getProject: ({ authToken, params }: RequestType) =>
      request({
        method: "GET",
        url: urls.project.getProject,
        authToken,
        params,
      }),

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

    deleteProject: ({ data, authToken }: RequestType) =>
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

    inviteTeamMember: ({ data, authToken }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.project.inviteTeamMember,
        authToken,
      }),

    updateProjectMember: ({ data, authToken }: RequestType) =>
      request({
        method: "PUT",
        data,
        url: urls.project.updateProjectMember,
        authToken,
      }),

    getProjectMembers: ({ data, authToken }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.project.getProjectMembers,
        authToken,
      }),

    removeProjectMember: ({ params, authToken }: RequestType) =>
      request({
        method: "DELETE",
        params,
        url: urls.project.removeProjectMember,
        authToken,
      }),
  };
};

export default projectService;
