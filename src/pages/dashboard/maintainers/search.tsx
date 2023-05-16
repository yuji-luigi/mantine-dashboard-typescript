import { Box } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import Page from '../../../components/Page';
import Tables from '../../../components/datatable/Tables';
import { CrudDrawerDefault } from '../../../components/drawer/CrudDrawerDefault';
import { usePaginationContext } from '../../../context/PaginationContext';
import { sections } from '../../../data';
import { useCrudSliceStore, useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { TableSectionHeader } from '../../../sections/dashboard_sections/datatable_section/TableSectionHeader';
import { Sections } from '../../../types/general/data/sections-type';
import formFields from '../../../../json/dataTable/formfields';
import Layout from '../../../layouts';

const MaintainerSearchPage = () => {
  const { query, push } = useRouter();

  const entity = 'maintainers';
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
      {/* <Group align="end" position="apart" pl={16} mb={32} sx={{ width: '100%' }}> */}
      <Box px={32}>
        <TableSectionHeader overridingEntity="maintainers" />
      </Box>
      {/* </Group> */}
      <Tables overridingEntity="maintainers" />
      <CrudDrawerDefault overridingEntity="maintainers" />
    </Page>
  );
};

MaintainerSearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MaintainerSearchPage;
