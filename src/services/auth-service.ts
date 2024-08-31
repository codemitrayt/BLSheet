import { RequestType } from "./../types";
import urls from "../utils/urls";
import request from "../api";

const authService = () => {
  return {
    sendVerificationEmailForRegistration: ({ data }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.auth.sendVerificationEmailForRegistration,
      }),

    createPassword: ({ data }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.auth.createPassword,
      }),

    login: ({ data }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.auth.login,
      }),

    self: ({ data, authToken }: RequestType) =>
      request({
        method: "POST",
        data,
        authToken,
        url: urls.auth.self,
      }),
    forgotPassword: ({ data }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.auth.forgotPassword,
      }),
  };
};

export default authService;
