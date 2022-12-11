import React, { ReactElement } from 'react';
import Layout from '../layouts';
import LoginPageComponent from '../sections/auth/LoginPageComponent';

const LoginPage = () => <LoginPageComponent />;

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};
