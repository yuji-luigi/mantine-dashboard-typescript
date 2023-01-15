import { useRouter } from 'next/router';
import useSWR from 'swr';
import React, { ReactElement, useEffect } from 'react';
import { ParsedUrlQuery } from 'querystring';
import axiosInstance from '../../../../utils/axios-instance';
import { PATH } from '../../../../path/api-routes';

import { useCrudSlice } from '../../../../../hooks/redux-hooks/useCrudSlice';
import { UsersTable } from '../../../../components/datatable/UsersTable';
import Layout from '../../../../layouts';
import { TableSectionHeader } from '../../../../sections/datatable/TableSectionHeader';
import Page from '../../../../components/Page';
import useLayoutContext from '../../../../../hooks/useLayoutContext';

const fetcher = (args: string) => axiosInstance.get(args).then((res) => res.data);

interface Query extends ParsedUrlQuery {
  entity?: Sections;
  parentId?: string;
}
const ChildrenTablePage = () => {
  const { query }: { query: Query } = useRouter();
  const { setCrudDocuments } = useCrudSlice(query.entity);

  const { prevBreadcrumbs, restorePrevBreadcrumbs } = useLayoutContext();

  const { data, error } = useSWR(
    `/${PATH.linkedChildren}/${query.entity}/${query.parentId}`,
    fetcher
  );
  useEffect(() => {
    setCrudDocuments({ entity: query.entity, documents: data?.data || [] });
  }, [data]);

  useEffect(() => {
    restorePrevBreadcrumbs(prevBreadcrumbs);
  }, []);

  // console.log(crudDocuments);
  if (!data) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>{error.message || error || 'error occurred'}</p>;
  }
  return (
    <Page>
      <TableSectionHeader />
      <UsersTable />
    </Page>
  );
};

ChildrenTablePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ChildrenTablePage;
