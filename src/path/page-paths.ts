export const ROOT = '/';

export const AUTH = {
  LOGIN: '/login',
  SIGNUP: '/sign-up',
};

export const PATH_AFTER_LOGIN = '/dashboard/home';

// export const PATH_ROOT {}

export enum PATH_DASHBOARD {
  // root = '/dashboard',
  root = '/dashboard/posts',
  posts = '/dashboard/posts',
  maintenances = '/dashboard/maintenances',
  dashboard = '/dashboard/home',
  chooseRootSpace = '/choose-root-space',
  chooseOrganization = '/choose-organization',
  rootSpaceSelected = '/dashboard/enter-space',
  // organizationCookie = '/dashboard/select-organization',
  logout = '/logout',
  login = '/login',
  signup = '/sign-up',
  maintainers = '/dashboard/maintainers',
  maintainersSearch = '/dashboard/maintainers/search',
}
export enum CARD_LINK_PATH {
  posts = PATH_DASHBOARD.posts,
  maintenances = PATH_DASHBOARD.maintenances,
  rootSpaceSelected = PATH_DASHBOARD.rootSpaceSelected,
  // organizationCookie = PATH_DASHBOARD.organizationCookie,
}
