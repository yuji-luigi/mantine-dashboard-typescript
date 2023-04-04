export const ROOT = '/';

export const AUTH = {
  LOGIN: '/login',
  SIGNUP: '/sign-up',
};

export const PATH_AFTER_LOGIN = '/dashboard/home';

export enum PATH_DASHBOARD {
  root = '/dashboard',
  posts = '/dashboard/posts',
  maintenances = '/dashboard/maintenances',
  dashboard = '/dashboard/home',
}
export enum CARD_LINK_PATH {
  posts = PATH_DASHBOARD.posts,
  maintenances = PATH_DASHBOARD.maintenances,
}
