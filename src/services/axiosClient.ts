import axios, { AxiosError } from "axios";

import { store } from "../app/store";
import { BASE_URL } from "../constants";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

interface ErrorResponse {
  content: string;
}

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError<ErrorResponse>) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.request.use((config) => {
  if (config.headers) {
    const accessToken = store.getState().user.userInfo.accessToken
      ? store.getState().user.userInfo.accessToken
      : store.getState().user.token;
    console.log(accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

export default axiosClient;
