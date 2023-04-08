import { API_BASE_URL } from './../path/api-routes';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// ----------------------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export interface AxiosResData {
  success: boolean;
  collection: Sections;
  data: Array<AllModels>;
  totalDocuments: number;
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<AxiosResData>) =>
    // const token = localStorage.getItem('accessToken');
    // response.headers.Authorization = token as string;
    response,
  (error) =>
    Promise.reject((error.response && error.response.data) || 'Error connecting to server.')
);

export const uploadConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  // withCredentials: true,
};
export default axiosInstance;
