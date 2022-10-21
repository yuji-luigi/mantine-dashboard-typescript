import React, { ReactElement } from 'react';
import Page from '../../components/Page';
import Layout from '../../layouts';
import { TableSectionHeader } from '../../sections/datatable/TableSectionHeader';
import { PropWithChildren } from '../../types/general/config';
import { NextPageWithLayout } from '../_app';

const DashboardTopPage: NextPageWithLayout<PropWithChildren> = () => (
  <Page title="HOME:">
    <TableSectionHeader />
  </Page>
);

DashboardTopPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default DashboardTopPage;
