import axios from "axios";
import urls from "../utils/urls";
import { RequestType } from "../types";

const request = ({
  method = "GET",
  authToken = null,
  data = {},
  params = null,
  url,
}: RequestType) => {
  return axios({
    baseURL:
      import.meta.env.VITE_NODE_ENV === "production"
        ? urls.main.baseUrl
        : urls.main.developmentBaseUrl,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    data,
    params,
    url,
  });
};

export default request;
