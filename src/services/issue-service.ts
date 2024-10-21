import { RequestType } from "./../types";
import urls from "../utils/urls";
import request from "../api";

const issueService = {
  getIssue: ({ authToken, params }: RequestType) =>
    request({
      method: "GET",
      params,
      url: urls.issue.getIssue,
      authToken,
    }),

  createIssue: ({ authToken, data, params }: RequestType) =>
    request({
      method: "POST",
      data,
      params,
      url: urls.issue.createIssue,
      authToken,
    }),

  getIssues: ({ authToken, params }: RequestType) =>
    request({
      method: "GET",
      params,
      url: urls.issue.getIssues,
      authToken,
    }),

  changeIssueStatus: ({ authToken, params, data }: RequestType) =>
    request({
      method: "POST",
      params,
      data,
      url: urls.issue.changeIssueStatus,
      authToken,
    }),

  updateIssue: ({ authToken, params, data }: RequestType) =>
    request({
      method: "PUT",
      params,
      data,
      url: urls.issue.updateIssue,
      authToken,
    }),

  deleteIssue: ({ authToken, params }: RequestType) =>
    request({
      method: "DELETE",
      params,
      url: urls.issue.deleteIssue,
      authToken,
    }),

  assignUserToIssue: ({ authToken, params, data }: RequestType) =>
    request({
      method: "POST",
      params,
      data,
      url: urls.issue.assignUserToIssue,
      authToken,
    }),

  removeAssignedUserFormIssue: ({ authToken, params, data }: RequestType) =>
    request({
      method: "DELETE",
      params,
      data,
      url: urls.issue.removeAssignedUserFormIssue,
      authToken,
    }),

  createIssueComment: ({ authToken, data }: RequestType) =>
    request({
      method: "POST",
      data,
      url: urls.issue.createIssueComment,
      authToken,
    }),

  updateIssueComment: ({ authToken, data }: RequestType) =>
    request({
      method: "PUT",
      data,
      url: urls.issue.updateIssueComment,
      authToken,
    }),

  getIssueComments: ({ authToken, data }: RequestType) =>
    request({
      method: "POST",
      data,
      url: urls.issue.getIssueComments,
      authToken,
    }),

  replyToIssueComment: ({ authToken, data }: RequestType) =>
    request({
      method: "POST",
      data,
      url: urls.issue.replyToIssueComment,
      authToken,
    }),

  getIssueCommentReplies: ({ authToken, data }: RequestType) =>
    request({
      method: "POST",
      data,
      url: urls.issue.getIssueCommentReplies,
      authToken,
    }),

  deleteIssueComment: ({ authToken, data }: RequestType) =>
    request({
      method: "DELETE",
      data,
      url: urls.issue.deleteIssueComment,
      authToken,
    }),
};

export default issueService;
