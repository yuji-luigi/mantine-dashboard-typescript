export interface IUser {
  _id: string;
  name: string | undefined;
  surname?: string | undefined;
  phone?: string | undefined;
  email: string | undefined;
  password: string;
  role: 'admin' | 'user' | 'super_admin';
  bookmarks: string[] | BookmarkModel[];
  wallet?: string | WalletModel;
  buildings: [] | string[] | IBuilding[] | undefined;
  userSetting: string | UserSettingModel;
  last_login: Date;
  rootSpaces: SpaceModel[] | [];
  // modules?: modules;

  _update?: {
    password?: Buffer | string;
  };
  /*   roles: string[] | any;
   */
}

type ActionEnum = 'LOGIN' | 'REGISTER' | 'LOGOUT' | 'INITIALIZE';

export interface JWTContextState {
  isAuthenticated?: boolean | null;
  isInitialized?: boolean | null;
  user?: UserModel | null;
  isSuperAdmin?: boolean;
}
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

export type Logout = () => Promise<void>;

export interface RegisterData {
  email: string | null;
  password: string | null;
  password2: string | null;
  name: string;
  surname: string | null;
  // role: string | null;
}
export type Register = (data: RegisterData) => Promise<void>;
export type Login = (email?: string, password?: string) => Promise<void>;

export interface AuthContextInterface extends JWTContextState {
  method: string;
  login: Login;
  logout: () => void;
  register: Register;
}
