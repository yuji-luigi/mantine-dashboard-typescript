import React, { ReactElement } from 'react';
import Layout from '../../layouts';
import { PropWithChildren } from '../../types/general/config';
import { NextPageWithLayout } from '../_app';

const DashboardTopPage: NextPageWithLayout<PropWithChildren> = ({ children }) => (
  <Layout>{children}</Layout>
);

DashboardTopPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardTopPage>{page}</DashboardTopPage>
    </Layout>
  );
};
export default DashboardTopPage;
