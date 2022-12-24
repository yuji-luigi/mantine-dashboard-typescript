import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { createStyles } from '@mantine/core';
import { TableSectionHeader } from '../../sections/datatable/TableSectionHeader';
import type { NextPageWithLayout } from '../_app';
import { PropWithChildren } from '../../types/general/config';
import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import { sectionData, sections } from '../../data';
import formFields from '../../../json/dataTable/formfields';
import Page from '../../components/Page';
import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
import { isConstructorDeclaration } from 'typescript';
// import { useCrudSlice } from '../../hooks/redux-hooks/useCrudSlice';

// TODO: GET_STATIC PROPS AND GET JSON THEN REDIRECT IF DOES NOT EXIST

const entities: string[] = Object.keys(sectionData);

const en: string[][] = sectionData.map((data) => data.contents.map((content) => content.entity));
const ent = en.reduce((arr, cur) => arr.concat(cur), []);
// const useStyle = createStyles((theme) => ({}));

const CrudPage: NextPageWithLayout<PropWithChildren> = () => {
  const { query, push } = useRouter();
  const entity = query.entity as Sections;
  const { fetchCrudDocuments, crudDocuments, crudMessage, crudStatus } = useCrudSlice(entity);
  formFields as FormFieldsType;
  useEffect(() => {
    if (!sections.includes(entity as string)) {
      push('/dashboard/home');
    }
    if (!crudDocuments.length) {
      fetchCrudDocuments({ entity });
    }
  }, [entity]);

  return (
    <Page>
      <div>
        <TableSectionHeader />
        <Tables />
      </div>
    </Page>
  );
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CrudPage;
