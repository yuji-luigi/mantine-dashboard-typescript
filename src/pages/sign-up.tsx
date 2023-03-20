import React, { ReactElement } from 'react';
import Layout from '../layouts';
import { SignUpForm } from '../sections/login_signup_section/SignUpForm';

const SignUpPage = () => <SignUpForm />;

export default SignUpPage;

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};
