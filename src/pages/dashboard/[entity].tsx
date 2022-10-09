import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { createStyles } from '@mantine/core';
import { SectionHeader } from '../../components/datatable/SectionHeader';
import type { NextPageWithLayout } from '../_app';
import { PropWithChildren } from '../../types/general/config';
import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';

// const entities: string[] = ['users', 'buildings'];
const useStyle = createStyles((theme) => ({
  contentWrapper: {
    [theme.fn.largerThan('md')]: {
      paddingLeft: 300,
    },
    padding: 20,
    paddingTop: 50,
  },
}));

const CrudPage: NextPageWithLayout<PropWithChildren> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { classes } = useStyle();
  const router = useRouter();
  const entity = router.query.entity as string;

  // useEffect(() => {
  //   if (!entities.includes(entity)) {
  //     router.push('/404');
  //   }
  // }, []);

  return (
    <div className={classes.contentWrapper}>
      <SectionHeader entity={entity} />
      <Tables />
      {children}
    </div>
  );
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <CrudPage>{page}</CrudPage>
    </Layout>
  );
};

export default CrudPage;
