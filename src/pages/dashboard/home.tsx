import React, { ReactElement } from 'react';
import Page from '../../components/Page';
import Layout from '../../layouts';
import { TableSectionHeader } from '../../sections/dashboard_sections/datatable_section/TableSectionHeader';
import { ProgressCard } from '../../components/stats/ProgressCard';
import { StatsGrid } from '../../components/stats/StatsGrid';
import { StatsControls } from '../../components/stats/StatControls';
import { StatsGridIcons } from '../../components/stats/StatGridsDiffIcons';

import data from '../../../json/mock/statsGrid.json';

const DashboardTopPage /* : NextPageWithLayout<PropWithChildren> */ = () => (
  <Page title="HOME:">
    <TableSectionHeader overridingEntity="home" />
    <ProgressCard />
    {/* <ProgressCardColored /> */}
    <StatsGrid />
    <StatsControls />
    <StatsGridIcons data={data} />
  </Page>
);

DashboardTopPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default DashboardTopPage;
