import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Layout from '../layouts';
import LoginPage from './login';

const LogoutPage = () => {
  const { logout } = useAuth();
  const { replace } = useRouter();
  useEffect(() => {
    logout();
    replace('/login');
  }, []);

  return <LoginPage user={undefined} />;
};

export default LogoutPage;
