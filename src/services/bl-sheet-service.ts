import urls from "../utils/urls";
import request from "../api";
import { RequestType } from "./../types";

const blSheetService = () => {
  return {
    getBlSheets: ({ authToken, params }: RequestType) =>
      request({
        method: "GET",
        url: urls.blSheet.getBlSheets,
        authToken,
        params,
      }),

    createBlSheet: ({ data, authToken }: RequestType) =>
      request({
        method: "POST",
        data,
        url: urls.blSheet.createBlSheet,
        authToken,
      }),

    deleteBLSheet: ({ data, authToken }: RequestType) =>
      request({
        method: "DELETE",
        data,
        url: urls.blSheet.deleteBlSheet,
        authToken,
      }),

    editBlSheet: ({ data, authToken, params }: RequestType) =>
      request({
        method: "PUT",
        params,
        data,
        url: urls.blSheet.editBlSheet,
        authToken,
      }),
  };
};

export default blSheetService;
