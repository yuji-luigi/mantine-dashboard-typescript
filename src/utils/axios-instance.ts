import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../path/api-routes';

// ----------------------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export interface AxiosResData {
  success: boolean;
  collection: Sections;
  documents: Array<AllModels>;
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

export default axiosInstance;
