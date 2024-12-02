import axios from "axios";
import { RequestType } from "../types";

const request = ({
  method = "GET",
  authToken = null,
  data = {},
  params = null,
  url,
  isFormData = false,
}: RequestType) => {
  return axios({
    baseURL: import.meta.env.VITE_BASE_URL,
    method,
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    data,
    params,
    url,
  });
};

export default request;
