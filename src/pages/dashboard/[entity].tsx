import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { createStyles } from '@mantine/core';
import { TableSectionHeader } from '../../sections/datatable/TableSectionHeader';
import type { NextPageWithLayout } from '../_app';
import { PropWithChildren } from '../../types/general/config';
import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import { sections } from '../../data';
import formFields from '../../../json/dataTable/formfields';
import Page from '../../components/Page';
// import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import useAuth from '../../../hooks/useAuth';
import axiosInstance from '../../utils/axios-instance';
import { PATH_AUTH } from '../../path/api-routes';
import { GetServerSideProps } from 'next';
// import { useCrudSlice } from '../../hooks/redux-hooks/useCrudSlice';

// TODO: GET_STATIC PROPS AND GET JSON THEN REDIRECT IF DOES NOT EXIST

// const entities: string[] = Object.keys(sectionData);

// const en: string[][] = sectionData.map((data) => data.contents.map((content) => content.entity));
// const ent = en.reduce((arr, cur) => arr.concat(cur), []);
// const useStyle = createStyles((theme) => ({}));

const CrudPage = ({ isHead = false }: { isHead: boolean }) => {
  const { query, push } = useRouter();

  // const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb>>([]);
  const entity = query.entity as Sections;

  const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocuments, isChildrenTree } = useCrudSelectors(entity);
  formFields as FormFieldsType;
  useEffect(() => {
    // axiosInstance
    //   .get('/auth/me', { withCredentials: true })
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));

    if (!sections.includes(entity as string)) {
      push('/dashboard/home');
    }
    // const regex = /^\w/;
    // const title = entity.replace(regex, (c) => c.toUpperCase());
    // setBreadcrumbs((prev) => [...prev, { title, href: `/${entity}` }]);

    if (!crudDocuments.length) {
      fetchCrudDocuments({ entity });
    }
    if (isChildrenTree) {
      fetchCrudDocuments({ entity, isChildrenTree: false });
    }
  }, [entity]); // include parentId: string | undefined to update on change page
  return (
    <Page>
      <div>
        <TableSectionHeader />
        {/* {JSON.stringify(breadcrumbs)} */}
        <Tables />
      </div>
      <CrudDrawerDefault />
    </Page>
  );
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

type Data = { data: any };

// export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
//   console.log(context);
//   const res = await axiosInstance.get('/auth/me', { withCredentials: true });
//   // const data: Data = res.data;
//   // console.log(data);
//   return {
//     props: {
//       data: res.data,
//     },
//   };
// };

export default CrudPage;
