import axios from "axios";
import { RequestType } from "../types";

const request = ({
  method = "GET",
  authToken = null,
  data = {},
  params = null,
  url,
}: RequestType) => {
  return axios({
    baseURL: import.meta.env.VITE_BASE_URL,
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
