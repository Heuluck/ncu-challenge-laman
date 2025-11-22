import axios from "axios";

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
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 服务器响应了状态码，但不是2xx
      console.error("Response error:", error.response.status, error.response.data);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error("No response received:", error.request);
    } else {
      // 其他错误
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
