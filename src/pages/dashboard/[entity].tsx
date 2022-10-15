import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { createStyles } from '@mantine/core';
import { SectionHeader } from '../../sections/datatable/SectionHeader';
import type { NextPageWithLayout } from '../_app';
import { PropWithChildren } from '../../types/general/config';
import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import { sectionData } from '../../data';
import formFields from '../../../data/datatable/formFields/index';
import { FormFields } from '../../types/general/data/datatable/sections-json';
import Page from '../../components/Page';

// TODO: GET_STATIC PROPS AND GET JSON THEN REDIRECT IF DOES NOT EXIST

const entities: string[] = Object.keys(sectionData);
// const useStyle = createStyles((theme) => ({}));

const CrudPage: NextPageWithLayout<PropWithChildren> = () => {
  // const { classes } = useStyle();
  const { query, push } = useRouter();
  const entity = query.entity as string;
  formFields as FormFields;
  useEffect(() => {
    if (!entities.includes(entity as string)) {
      push('/dashboard/home');
    }
  }, [entity]);
  return (
    <Page>

    <div>
      <SectionHeader />
      <Tables />
      {/* {children} */}
    </div>
    </Page>
  );
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CrudPage;
