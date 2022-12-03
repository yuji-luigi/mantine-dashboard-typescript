import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_BASE_URL } from "../path/api-routes";

// ----------------------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) =>
    // const token = localStorage.getItem('accessToken');
    // response.headers.Authorization = token as string;
    response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Error connecting to server."
    )
);

export default axiosInstance;
