import axios from "axios";
import urls from "../utils/urls";
import { RequestType } from "../types";

const request = ({
  method = "GET",
  authToken = null,
  data = null,
  params = null,
  url,
}: RequestType) => {
  return axios({
    baseURL: urls.main.baseUrl,
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