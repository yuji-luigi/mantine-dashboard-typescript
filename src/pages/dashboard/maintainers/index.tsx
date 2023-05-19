import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import Page from '../../../components/Page';
import Tables from '../../../components/datatable/Tables';
import { CrudDrawerDefault } from '../../../components/drawer/CrudDrawerDefault';
import { usePaginationContext } from '../../../context/PaginationContext';
import { sections } from '../../../data';
import Layout from '../../../layouts';
import formFields from '../../../../json/dataTable/formfields';
import { useCrudSliceStore, useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { TableSectionHeader } from '../../../sections/dashboard_sections/datatable_section/TableSectionHeader';
import { Sections } from '../../../types/general/data/sections-type';
import { Button, Group, Select, createStyles, Text, Box } from '@mantine/core';
import Link from 'next/link';
import { PATH_DASHBOARD } from '../../../path/page-paths';
import MaintainerList from '../../../sections/dashboard_sections/maintainers-section/MaintainerList';

const useStyles = createStyles((theme) => ({
  secondButton: {
    marginBlock: 32,
    alignSelf: 'end',
    backgroundColor: theme.colors.blue[7],
    color: theme.colors.blue[0],
    '&:hover': {
      backgroundColor: theme.colors.blue[8],
      color: theme.colors.blue[0],
    },
  },
}));

const MaintainerPage = () => {
  const { query, push } = useRouter();
  const { classes } = useStyles();

  const entity = 'maintainers';
  const { setPagination, paginationQuery } = usePaginationContext();

  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  const { crudDocuments, isChildrenTree } = useCrudSelectors(entity);
  formFields as FormFieldsType;

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
      <TableSectionHeader
        overridingEntity="maintainers"
        // children={
        //   <Button
        //     className={classes.secondButton}
        //     component={Link}
        //     href={PATH_DASHBOARD.maintainersSearch}
        //     children={<Text>Search Maintainer</Text>}
        //   />
        // }
      />
      {/* <Tables overridingEntity="maintainers" /> */}
      <MaintainerList entity={entity} />
      <CrudDrawerDefault overridingEntity="maintainers" />
    </Page>
  );
};

MaintainerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MaintainerPage;
