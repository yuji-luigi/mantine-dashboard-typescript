import { useRouter } from 'next/router';
import useSWR from 'swr';
import React, { ReactElement, useEffect } from 'react';
import axiosInstance from '../../../../utils/axios-instance';

import { UsersTable } from '../../../../components/datatable/UsersTable';
import Layout from '../../../../layouts';
import { TableSectionHeader } from '../../../../sections/datatable/TableSectionHeader';
import Page from '../../../../components/Page';
import useLayoutContext from '../../../../../hooks/useLayoutContext';
import { CrudDrawerDefault } from '../../../../components/drawer/CrudDrawerDefault';
import {
  /* useCrudSelectors, */ useCrudSliceStore,
} from '../../../../redux/features/crud/crudSlice';
import { usePaginationContext } from '../../../../context/PaginationContext';

const fetcher = (args: string) => axiosInstance.get(args).then((res) => res.data);

const ChildrenTablePage = () => {
  const { query }: { query: ParsedQueryCustom } = useRouter();
  const { fetchLinkedChildren } = useCrudSliceStore();
  // const { crudStatus } = useCrudSelectors(query.entity);
  const { paginationQuery } = usePaginationContext();

  const { setParentData } = useLayoutContext();

  const { prevBreadcrumbs, restorePrevBreadcrumbs } = useLayoutContext();

  // const { data, error } = useSWR(
  //   `/${API_PATH.linkedChildren}/${query.entity}/${query.parentId}`,
  //   fetcher
  // );
  const { data: parentData, error: parentError } = useSWR(
    `/${query.entity}/${query.parentId}`,
    fetcher
  );

  useEffect(() => {
    /** type guard condition */
    if (!query.entity || !query.parentId) {
      return;
    }
    fetchLinkedChildren({ entity: query.entity, parentId: query.parentId, query: paginationQuery });
    // setCrudDocuments({ entity: query.entity, documents: data?.data || [], isChildrenTree: true });

    if (parentData) {
      setParentData(parentData.data);
    }
  }, [parentData?.data, paginationQuery]);

  // console.log(query.parentId);
  useEffect(() => {
    restorePrevBreadcrumbs(prevBreadcrumbs);
    // drawerFormStateDispatch({ type: 'linkedChildren' });
    // setIsChildrenPage(true);
    // return () => setIsChildrenPage(false);
  }, []);

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
