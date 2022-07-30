import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/layout/dashboard/DashboardLayout';
import type { NextPageWithLayout } from '../_app';

const entities: string[] = ['users', 'buildings'];

const CrudPage: NextPageWithLayout = () => {
  const router = useRouter();
  const entity = router.query.entity as string;

  useEffect(() => {
    if (!entities.includes(entity)) {
      router.push('/404');
    }
  }, []);

  return <h1>{entity} page</h1>;
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <CrudPage>{page}</CrudPage>
    </DashboardLayout>
  );
};

export default CrudPage;
