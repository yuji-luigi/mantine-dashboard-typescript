import { useRouter } from 'next/router';
import useSWR from 'swr';
import React, { ReactElement, useEffect } from 'react';
import axiosInstance from '../../../../utils/axios-instance';

import { UsersTable } from '../../../../components/datatable/UsersTable';
import Layout from '../../../../layouts';
import { TableSectionHeader } from '../../../../sections/dashboard_sections/datatable_section/TableSectionHeader';
import Page from '../../../../components/Page';
import useLayoutContext from '../../../../../hooks/useLayoutContext';
import { CrudDrawerDefault } from '../../../../components/drawer/CrudDrawerDefault';
import {
  /* useCrudSelectors, */ useCrudSliceStore,
} from '../../../../redux/features/crud/crudSlice';
import { usePaginationContext } from '../../../../context/PaginationContext';

const fetcher = (args: string) => axiosInstance.get(args).then((res) => res.data?.data);

const ChildrenTablePage = () => {
  const { query }: { query: ParsedQueryCustom } = useRouter();
  const { fetchLinkedChildrenWithPagination } = useCrudSliceStore();
  // const { crudStatus } = useCrudSelectors(query.entity);
  const { paginationQuery } = usePaginationContext();

  const { setParentData } = useLayoutContext();

  const { setBreadcrumbs, setChildrenBreadcrumbs } = useLayoutContext();

  // const { data, error } = useSWR(
  //   `/${PATH_API.linkedChildren}/${query.entity}/${query.parentId}`,
  //   fetcher
  // );
  const { data: parentData, error: parentError } = useSWR<MongooseBaseModel>(
    `/${query.entity}/${query.parentId}`,
    fetcher
  );

  useEffect(() => {
    /** type guard condition */
    if (!query.entity || !query.parentId) {
      return;
    }
    fetchLinkedChildrenWithPagination({
      entity: query.entity,
      parentId: query.parentId,
      query: paginationQuery,
    });
    // setCrudDocuments({ entity: query.entity, documents: data?.data || [], isChildrenTree: true });

    if (parentData) {
      setParentData(parentData);
      // setBreadcrumbs({ title: parentData.name, href: parentData._id });
      setChildrenBreadcrumbs({ title: parentData.name, href: parentData._id });
    }
  }, [parentData, paginationQuery]);

  // console.log(query.parentId);

  // if (crudStatus === 'loading' || crudStatus === 'idle') {
  //   return <p>loading</p>;
  // }
  if (parentError) {
    return <p>{parentError.message || parentError || 'error occurred'}</p>;
  }

  return (
    <Page>
      <TableSectionHeader />
      <UsersTable />
      <CrudDrawerDefault />
    </Page>
  );
};

ChildrenTablePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ChildrenTablePage;
