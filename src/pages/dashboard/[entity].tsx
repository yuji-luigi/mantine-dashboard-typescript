import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TableSectionHeader } from '../../sections/dashboard_sections/datatable_section/TableSectionHeader';

import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import { sections } from '../../data';
import formFields from '../../../json/dataTable/formfields';
import Page from '../../components/Page';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { usePaginationContext } from '../../context/PaginationContext';
import { Sections } from '../../types/general/data/sections-type';
import { Box } from '@mantine/core';

const CrudPage = () => {
  const { query, push } = useRouter();

  const entity = query.entity as Sections;
  const { setPagination, paginationQuery } = usePaginationContext();

  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  const { crudDocuments, isChildrenTree } = useCrudSelectors(entity);
  formFields as FormFieldsType;
  useEffect(() => {
    if (!sections.includes(entity)) {
      push('/dashboard/home');
    }
  }, [entity]); // include parentId: string | undefined to update on change page

  useEffect(() => {
    /** type guard */
    if (!entity) {
      return;
    }
    /** check if this is a childrenPage */
    if (query.parentId) {
      return;
    }
    /** fetch all the entity if not childrenpage */
    fetchCrudDocumentsWithPagination({ entity: entity, query: paginationQuery });
  }, [paginationQuery, entity, query.parentId]);

  return (
    <Page>
      {/* <Box px={32}> */}
      <TableSectionHeader />
      <Tables />
      {/* </Box> */}
      <CrudDrawerDefault />
    </Page>
  );
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CrudPage;
