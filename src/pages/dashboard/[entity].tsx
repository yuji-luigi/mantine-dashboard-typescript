import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createStyles } from '@mantine/core';
import { SectionHeader } from '../../sections/datatable/SectionHeader';
import type { NextPageWithLayout } from '../_app';
import { PropWithChildren } from '../../types/general/config';
import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import { sectionData } from '../../data';

// TODO: GET_STATIC PROPS AND GET JSON THEN REDIRECT IF DOES NOT EXIST

const entities: string[] = Object.keys(sectionData);
const useStyle = createStyles((theme) => ({
  contentWrapper: {
    [theme.fn.largerThan('md')]: {
      paddingLeft: 300,
    },
    padding: 20,
    paddingTop: 50,
  },
}));

const CrudPage: NextPageWithLayout<PropWithChildren> = () => {
  const { classes } = useStyle();
  const { query, push } = useRouter();
  const { entity } = query;
  useEffect(() => {
    console.log('useEffect');
    if (!entities.includes(entity as string)) {
      push('/dashboard/home');
    }
  }, [entity]);
  return (
    <div className={classes.contentWrapper}>
      <SectionHeader />
      <Tables />
      {/* {children} */}
    </div>
  );
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <CrudPage>{page}</CrudPage>
    </Layout>
  );
};

export default CrudPage;
