import axios from "axios";
import { getCookie } from "../Cookie";

/* 기본 api */
export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

/* token이 들어간 api */
export const apiToken = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

apiToken.interceptors.request.use(
  (config) => {
    const authorization = getCookie("token");
    config.headers.Authorization = `Bearer ${authorization}`;
    return config;
  },
  (error) => {
    alert("apiToken 에러입니다.", error);
  }
);