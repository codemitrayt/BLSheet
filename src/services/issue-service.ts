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
};

export default issueService;
