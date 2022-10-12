import { createContext, ReactNode, useEffect, useReducer } from 'react';
import axiosInstance from '../utils/axios-instance';
import { PATH_AUTH } from '../path/api-routes';
import {
  JWTContextReducerAction,
  JWTContextState,
  JWTContextHandlers,
  Register,
  Login,
  Logout,
  AuthContextInterface,
  RegisterData,
} from '../types/context/auth/useAuth';
import { isValidToken, setSession } from '../utils/jwt';

const initialState: JWTContextState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: JWTContextHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload as JWTContextState;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload as JWTContextState;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({ ...state, isAuthenticated: false, user: null }),
  REGISTER: (state, action) => {
    const { user } = action.payload as JWTContextState;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state: JWTContextState, action: JWTContextReducerAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<AuthContextInterface>({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axiosInstance.get(PATH_AUTH.me, { withCredentials: true });
          const { user } = response.data;
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const login: Login = async (email, password) => {
    const response = await axiosInstance.post(
      PATH_AUTH.login,
      { email, password }
      // { withCredentials: true }
    );
    const { token } = response.data.data;
    setSession(token.accessToken);

    // call me and get the user
    const responseMe = await axiosInstance.get(PATH_AUTH.me);
    const { user } = responseMe.data.data;
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const register: Register = async (formData: RegisterData) => {
    try {
      const response = await axiosInstance.post(PATH_AUTH.register, formData);
      const { accessToken, user } = response.data;
      localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
    } catch (error: any) {
      console.error(error.message || error);
    }
  };

  const logout: Logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
