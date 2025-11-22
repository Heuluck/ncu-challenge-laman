import { message } from "antd";
import axios, { AxiosError } from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加认证 token
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    message.error("请求出现错误");
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data.status !== 0 || response.status !== 200) {
      message.error(response?.data?.msg || "请求出错");
      // 服务器响应了状态码，但不是2xx
      console.error("请求响应出错：", response.status, response.data);
      return Promise.reject(
        new AxiosError(
          response.data.msg || "请求失败",
          String(response.status),
          response.config,
          response.request,
          response,
        ),
      );
    }
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (axios.isAxiosError(error)) {
      if (error.response) {
        message.error(error.response?.data?.msg || error.message);
        // 服务器响应了状态码，但不是2xx
        console.error(
          "请求响应出错：",
          error.response.status,
          error.response.data,
        );
      } else if (error.request) {
        // 请求已发出，但没有收到响应
        message.error("未收到服务器响应");
        console.error("请求已发出，但没有收到响应：", error.request);
      }
    } else {
      message.error("请求错误");
      console.error("请求错误：", error);
    }
    return Promise.reject(error);
  },
);
