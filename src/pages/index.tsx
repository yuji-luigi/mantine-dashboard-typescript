import { ReactElement } from 'react';
import Layout from '../layouts';
import { SignUpForm } from '../components/auth/SignUpForm';
import { Hero } from './main/hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignUpForm />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};
