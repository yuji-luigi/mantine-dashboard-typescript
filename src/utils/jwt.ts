import { setCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
// routes
import { PATH_AUTH } from '../path/api-routes';
//
import axiosInstance from './axios-instance';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    // eslint-disable-next-line no-alert
    alert('Token expired');

    localStorage.removeItem('accessToken');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    // setCookie('jwt', accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { exp }: { exp: number } = jwtDecode(accessToken); // ~5 days by minimals server
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

const setSpaceSession = (spaceJwt: string | null) => {
  if (spaceJwt) {
    localStorage.setItem('spaceToken', spaceJwt);
    // setCookie('space', spaceJwt);
    axiosInstance.defaults.headers.common.space = `${spaceJwt}`;
    // This function below will handle when token is expired
    const { exp }: { exp: number } = jwtDecode(spaceJwt); // ~5 days by minimals server
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, setSpaceSession };
