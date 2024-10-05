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

    getProjectTasks: ({ data, authToken, params }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.projectTask.getProjectTasks,
        authToken,
        params,
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

    assignUserToProjectTask: ({ authToken, data }: RequestType) =>
      request({
        method: "POST",
        url: urls.projectTask.assignUserToProjectTask,
        authToken,
        data,
      }),

    removeAssignedUserFormProjectTask: ({ authToken, data }: RequestType) =>
      request({
        method: "DELETE",
        url: urls.projectTask.removeAssignedUserFormProjectTask,
        authToken,
        data,
      }),

    createProjectTaskComment: ({ authToken, data }: RequestType) =>
      request({
        method: "POST",
        url: urls.projectTask.createProjectTaskComment,
        authToken,
        data,
      }),

    getProjectTaskComments: ({ authToken, data }: RequestType) =>
      request({
        method: "POST",
        url: urls.projectTask.getProjectTaskComments,
        authToken,
        data,
      }),

    deleteProjectTaskComment: ({ authToken, data }: RequestType) =>
      request({
        method: "DELETE",
        url: urls.projectTask.deleteProjectTaskComment,
        authToken,
        data,
      }),

    updateProjectTaskComment: ({ authToken, data }: RequestType) =>
      request({
        method: "PUT",
        url: urls.projectTask.updateProjectTaskComment,
        authToken,
        data,
      }),

    getProjectTaskForUser: ({ authToken, data }: RequestType) =>
      request({
        method: "POST",
        url: urls.projectTask.getProjectTaskForUser,
        authToken,
        data,
      }),

    replyToProjectTaskComment: ({ authToken, data }: RequestType) =>
      request({
        method: "POST",
        url: urls.projectTask.replyToProjectTaskComment,
        authToken,
        data,
      }),

    getProjectTaskCommentReplies: ({ authToken, data }: RequestType) =>
      request({
        method: "POST",
        url: urls.projectTask.getProjectTaskCommentReplies,
        authToken,
        data,
      }),
  };
};

export default projectTaskService;
