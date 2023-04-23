import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TableSectionHeader } from '../../sections/dashboard_sections/datatable_section/TableSectionHeader';

import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import Page from '../../components/Page';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';

const HeadSpaceTable = () => {
  const entity = 'spaces';
  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();

  useEffect(() => {
    fetchCrudDocumentsWithPagination({ entity, query: '?isHead=true' });
  }, [entity]); // include parentId: string | undefined to update on change page

  return (
    <Page>
      <div>
        <TableSectionHeader overridingEntity="spaces" />
        <Tables overridingEntity="spaces" />
      </div>
      <CrudDrawerDefault overridingEntity="spaces" />
    </Page>
  );
};

HeadSpaceTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

type Data = { data: any };

export default HeadSpaceTable;
