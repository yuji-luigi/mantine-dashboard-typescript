import { useRouter } from 'next/router';
import useSWR from 'swr';
import React, { ReactElement, useEffect } from 'react';
import axiosInstance from '../../../../utils/axios-instance';
import { PATH } from '../../../../path/api-routes';

import { UsersTable } from '../../../../components/datatable/UsersTable';
import Layout from '../../../../layouts';
import { TableSectionHeader } from '../../../../sections/datatable/TableSectionHeader';
import Page from '../../../../components/Page';
import useLayoutContext from '../../../../../hooks/useLayoutContext';
import { CrudDrawerDefault } from '../../../../components/drawer/CrudDrawerDefault';
import { useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';

const fetcher = (args: string) => axiosInstance.get(args).then((res) => res.data);

const ChildrenTablePage = () => {
  const { query }: { query: ParsedQueryCustom } = useRouter();
  const { setCrudDocuments } = useCrudSliceStore();

  const { setParentData } = useLayoutContext();

  const { prevBreadcrumbs, restorePrevBreadcrumbs } = useLayoutContext();

  const { data, error } = useSWR(
    `/${PATH.linkedChildren}/${query.entity}/${query.parentId}`,
    fetcher
  );
  const { data: parentData, error: parentError } = useSWR(
    `/${query.entity}/${query.parentId}`,
    fetcher
  );

  useEffect(() => {
    console.log(query);
    setCrudDocuments({ entity: query.entity, documents: data?.data || [], isChildrenTree: true });
    if (parentData) {
      setParentData(parentData.data);
    }
  }, [data, parentData?.data]);

  // console.log(query.parentId);
  useEffect(() => {
    restorePrevBreadcrumbs(prevBreadcrumbs);
    // drawerFormStateDispatch({ type: 'linkedChildren' });
    // setIsChildrenPage(true);
    // return () => setIsChildrenPage(false);
  }, []);

  if (!data) {
    return <p>loading</p>;
  }
  if (error || parentError) {
    return (
      <p>{error?.message || error || parentError.message || parentError || 'error occurred'}</p>
    );
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
