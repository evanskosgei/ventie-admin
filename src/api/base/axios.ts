import axios from "axios";
import { getToken } from "../../utils/helpers";

const baseURL = "http://api.kisotech.xyz/api/";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.config.url !== "/auth/login") {
      console.log("interceptor");
      // window.logout();
    }
    return await Promise.reject(error);
  }
);

export default axiosInstance;
