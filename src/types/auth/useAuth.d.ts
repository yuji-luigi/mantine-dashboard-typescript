export interface IUser {
  _id?: string;
  name?: string | undefined;
  surname?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
  password: string;
  role?: string | undefined;
  bookmarks?: string[] | IBookmark[];
  wallet?: string | IWallet;
  buildings?: string[] | IBuilding[] | undefined;
  userSetting: string | IUserSetting;
  last_login?: Date;
  modules?: modules;

  _update?: {
    password?: Buffer | string;
  };
  /*   roles: string[] | any;
   */
}

type ActionEnum = 'LOGIN' | 'REGISTER' | 'LOGOUT' | 'INITIALIZE';

export type JWTContextState = {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: IUser | null;
};
export interface ReducerStateAction {
  payload?: JWTContextState;
}

export interface JWTContextReducerAction {
  payload?: JWTContextState;
  type: ActionEnum;
}

export interface JWTContextReducerLogoutAction {
  type: 'LOGOUT';
}

export type JWTContextReducer = (
  state: JWTContextState,
  action: ReducerStateAction
) => JWTContextState;

export interface JWTContextHandlers {
  [key: ActionEnum]: JWTContextReducer;
  INITIALIZE: JWTContextReducer;
  LOGIN: JWTContextReducer;
  LOGOUT: JWTContextReducer;
  REGISTER: JWTContextReducer;
}

export type Login = (email?: string, password?: string) => Promise<void>;
export type Logout = () => Promise<void>;
export type Register = (
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string
) => Promise<void>;

export interface AuthContextInterface {
  initialState?: JWTContextState;
  method: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}
