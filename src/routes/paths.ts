export const API_BASE_URL = process.env.HOST_API_BASE_URL;
export const ROOT_AUTH = 'auth';

export type GetPathFunc = (path: string) => string;

const getApiBasePath: GetPathFunc = (path) => `${API_BASE_URL}/${path}`;
const getAuthPath: GetPathFunc = (path) => getApiBasePath(`${ROOT_AUTH}/${path}`);

type TAuthPath = {
  [key: string]: string;
  login: string;
  register: string;
  logout: string;
};

export const PATH_AUTH: TAuthPath = {
  login: getAuthPath(`login`),
  register: getAuthPath('register'),
  logout: getAuthPath(`logout`),
};
