import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/layout/dashboard/DashboardLayout';
import type { NextPageWithLayout } from '../_app';
import { PropWithChildren } from '../../types/general/config';

const entities: string[] = ['users', 'buildings'];

const CrudPage: NextPageWithLayout<PropWithChildren> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const entity = router.query.entity as string;

  useEffect(() => {
    if (!entities.includes(entity)) {
      router.push('/404');
    }
  }, []);

  return (
    <h1>
      {entity} {children}
    </h1>
  );
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <CrudPage>{page}</CrudPage>
    </DashboardLayout>
  );
};

export default CrudPage;
