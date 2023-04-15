export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export type GetPathFunc = (path: string) => string;
/**
 *  define auth string for api
 * tried to avoid repetition but was not necessary?
 */
export const ROOT_AUTH = 'auth';
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

export enum PATH_API {
  /**
   * creation: /linkedChildren/${entity}/...
   * update: /linkedChildren/${entity}/${}
   * */
  linkedChildren = 'linkedChildren',
  uploads = 'upload-files',
  getSpaceCookie = 'get-cookie/spaces',
}
