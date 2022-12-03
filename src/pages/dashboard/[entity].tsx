import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { createStyles } from '@mantine/core';
import { TableSectionHeader } from '../../sections/datatable/TableSectionHeader';
import type { NextPageWithLayout } from '../_app';
import { PropWithChildren } from '../../types/general/config';
import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import { sectionData } from '../../data';
import formFields from '../../../data/datatable/formFields';
import Page from '../../components/Page';
import { useCrudSlice } from '../../hooks/redux-hooks/useCrudSlice';
// import { useCrudSlice } from '../../hooks/redux-hooks/useCrudSlice';

// TODO: GET_STATIC PROPS AND GET JSON THEN REDIRECT IF DOES NOT EXIST

const entities: string[] = Object.keys(sectionData);
// const useStyle = createStyles((theme) => ({}));

const CrudPage: NextPageWithLayout<PropWithChildren> = () => {
  const { query, push } = useRouter();
  const entity = query.entity as Sections;
  const { fetchCrudDocuments, crudDocuments, crudMessage } = useCrudSlice(entity);
  formFields as FormFieldsType;
  useEffect(() => {
    if (!entities.includes(entity as string)) {
      push('/dashboard/home');
    }
    if (!crudDocuments.length) {
      fetchCrudDocuments(entity);
    }
  }, [entity]);
  return (
    <Page>
      <div>
        <TableSectionHeader />
        <Tables />
        <div>message: {crudMessage}</div>
      </div>
    </Page>
  );
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CrudPage;
