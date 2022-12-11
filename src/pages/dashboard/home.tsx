import React, { ReactElement } from 'react';
import Page from '../../components/Page';
import Layout from '../../layouts';
import { TableSectionHeader } from '../../sections/datatable/TableSectionHeader';
import { PropWithChildren } from '../../types/general/config';
import { NextPageWithLayout } from '../_app';
import useAuth from '../../hooks/useAuth';
import { ProgressCard } from '../../components/stats/ProgressCard';
import { ProgressCardColored } from '../../components/stats/ProgressCardColored';
import { StatsGrid } from '../../components/stats/StatsGrid';
import { StatsControls } from '../../components/stats/StatControls';
import { StatsGridIcons } from '../../components/stats/StatGridsDiffIcons';
import { ScrollArea } from '@mantine/core';

import data from '../../../data/mock/statsGrid.json';

const DashboardTopPage: NextPageWithLayout<PropWithChildren> = () => {
  const { user } = useAuth();
  return (
    <Page title="HOME:">
      <TableSectionHeader entityOverride="home" />
      <ProgressCard />
      {/* <ProgressCardColored /> */}
      <StatsGrid />
      <StatsControls />
      <StatsGridIcons data={data} />
    </Page>
  );
};

DashboardTopPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default DashboardTopPage;
