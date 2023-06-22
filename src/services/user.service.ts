import { AxiosResponse } from "axios";
import { axiosConfig } from "./axiosConfig";
import axiosClient from "./axiosClient";
import { User } from "../types/user.type";

const USER_API = {
  REGISTER_USER: "/users/register",
  LOGIN_USER: "/users/login",
  FORGOT_PASSWORD: "/users/forgotpassword",
  RESET_PASSWORD: "/users/resetpassword",
  UPDATE_INFO_USER: (id: string) => `/users/${id}`,
  LOGOUT_USER: "/users/logout",
};

const userService = {
  registerUser: (data: User) => {
    return axiosConfig.post<unknown, AxiosResponse>(
      USER_API.REGISTER_USER,
      data
    );
  },

  loginUser: (data: User) => {
    return axiosConfig.post(USER_API.LOGIN_USER, data);
  },

  forgotPassword: (data: { email: string }) => {
    return axiosConfig.post(USER_API.FORGOT_PASSWORD, data);
  },

  logoutUser: () => {
    return axiosClient.get(USER_API.LOGOUT_USER);
  },

  updateInfoUser: (data: User, id: string) => {
    return axiosClient.put<unknown, AxiosResponse>(
      USER_API.UPDATE_INFO_USER(id),
      data
    );
  },

  resetPassword: (data: { password: string; token: string | undefined }) => {
    return axiosConfig.put(USER_API.RESET_PASSWORD, data);
  },
};

export default userService;
