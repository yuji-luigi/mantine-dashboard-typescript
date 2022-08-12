import axios, { AxiosInstance, AxiosResponse } from 'axios';

// ----------------------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create({ baseURL: process.env.HOST_API_KEY || '' });

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
