import React, { ReactElement } from 'react';
import Page from '../../components/Page';
import Layout from '../../layouts';
import { TableSectionHeader } from '../../sections/datatable/TableSectionHeader';
import { PropWithChildren } from '../../types/general/config';
import { NextPageWithLayout } from '../_app';
import useAuth from '../../hooks/useAuth';

const DashboardTopPage: NextPageWithLayout<PropWithChildren> = () => {
  const { user } = useAuth();
  return (
    <Page title="HOME:">
      <TableSectionHeader />
      <h1>{user?.name || ''}</h1>
    </Page>
  );
};

DashboardTopPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default DashboardTopPage;
