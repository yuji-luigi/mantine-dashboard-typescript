import { ReactElement } from 'react';
// import { createStyles } from '@mantine/core';
import { TableSectionHeader } from '../../sections/datatable_section/TableSectionHeader';
import type { NextPageWithLayout } from '../_app';
import { PropWithChildren } from '../../types/general/config';
import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import Page from '../../components/Page';
// import { useCrudSlice } from '../../hooks/redux-hooks/useCrudSlice';

// TODO: GET_STATIC PROPS AND GET JSON THEN REDIRECT IF DOES NOT EXIST

const StatisticsPage: NextPageWithLayout<PropWithChildren> = () => (
  /** Define Entity from url */

  <Page>
    <div>
      <TableSectionHeader entityOverride="statistics" />
      <Tables entityOverride="statistics" />
      <div>message: </div>
    </div>
  </Page>
);
StatisticsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default StatisticsPage;
