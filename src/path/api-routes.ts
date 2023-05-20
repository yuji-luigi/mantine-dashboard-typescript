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
  spaces = 'spaces',
  spaceCookie = 'spaces/cookie',
  getSpaceSelections = 'spaces/selections',
  organization = 'organizations',
  maintainers = 'maintainers',
  organizationAll = 'organizations/all',
  organizationCookie = 'organizations/cookie',
  getOrganizationsAndSpaces = 'organizations/spaces',
  getOrganizationsForAdmin = 'organizations/selections/super-admin',
}

export const PATH_API_DATA_TABLE_ROOT = 'with-pagination';

export const PATH_API_DATA_TABLE = {
  linkedChildren: `${PATH_API_DATA_TABLE_ROOT}/linkedChildren`,
  uploads: `${PATH_API_DATA_TABLE_ROOT}/upload-files`,
  spaceCookie: `${PATH_API_DATA_TABLE_ROOT}/spaces/get-cookie`,
  spaces: `${PATH_API_DATA_TABLE_ROOT}/spaces`,
  getSpaceSelections: `${PATH_API_DATA_TABLE_ROOT}/spaces/selections`,
} as const;
