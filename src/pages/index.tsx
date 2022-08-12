import { ReactElement } from 'react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Layout from '../layouts';

export default function HomePage() {
  return (
    <>
      <ColorSchemeToggle />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};
