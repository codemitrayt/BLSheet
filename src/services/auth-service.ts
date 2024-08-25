import urls from "../utils/urls";
import request from "../api";
import { RequestType } from "./../types";

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
  };
};

export default authService;
