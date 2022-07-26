export const API_BASE_URL = process.env.NODE_ENV === 'development' ? process.env.HOST_API_BASE_URL : process.env.HOST_API_BASE_URL_PRODUCTION;
export const ROOT_AUTH = 'auth';

export type GetPathFunc = (path: string) => string;

// const getApiBasePath: GetPathFunc = (path) => `${API_BASE_URL}/${path}`;
const getAuthPath: GetPathFunc = (path) => `${ROOT_AUTH}/${path}`;

type TAuthPath = {
  // [key: string]: string;
  login: string;
  register: string;
  logout: string;
  me: string;
};

export const PATH_AUTH: TAuthPath = {
  login: getAuthPath('login'),
  register: getAuthPath('register'),
  logout: getAuthPath('logout'),
  me: getAuthPath('me'),
};
