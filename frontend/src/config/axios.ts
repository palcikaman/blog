import axios from "axios";
import { AUTH_TOKEN, BACKEND_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // config.withCredentials = true;
  }

  return config;
});

export default axiosInstance;
