import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { createStyles } from '@mantine/core';
import { TableSectionHeader } from '../../sections/datatable/TableSectionHeader';
import type { NextPageWithLayout } from '../_app';
import { PropWithChildren } from '../../types/general/config';
import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import { sectionData, sectionDataBeta, sections } from '../../data';
import formFields from '../../../data/dataTable/formfields';
import Page from '../../components/Page';
import { useCrudSlice } from '../../hooks/redux-hooks/useCrudSlice';
import { isConstructorDeclaration } from 'typescript';
// import { useCrudSlice } from '../../hooks/redux-hooks/useCrudSlice';

// TODO: GET_STATIC PROPS AND GET JSON THEN REDIRECT IF DOES NOT EXIST

const StatisticsPage: NextPageWithLayout<PropWithChildren> = () => {
/** Define Entity from url */
  const { query, push } = useRouter();


  return (
    <Page>
      <div>
        <TableSectionHeader entityOverride='statistics' />
        <Tables entityOverride='statistics' />
        <div>message: </div>
      </div>
    </Page>
  );
};

StatisticsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default StatisticsPage;
