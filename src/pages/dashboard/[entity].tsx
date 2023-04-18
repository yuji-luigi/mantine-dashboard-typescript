import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TableSectionHeader } from '../../sections/dashboard_sections/datatable_section/TableSectionHeader';

import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import { sections } from '../../data';
import formFields from '../../../json/dataTable/formfields';
import Page from '../../components/Page';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';

const CrudPage = ({ isHead = false /*  data */ }: { isHead: boolean /*  data?: IUser */ }) => {
  const { query, push } = useRouter();

  const entity = query.entity as Sections;

  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  const { crudDocuments, isChildrenTree } = useCrudSelectors(entity);
  formFields as FormFieldsType;
  useEffect(() => {
    if (!sections.includes(entity)) {
      push('/dashboard/home');
    }

    if (!crudDocuments.length) {
      fetchCrudDocumentsWithPagination({ entity });
    }
    if (isChildrenTree) {
      fetchCrudDocumentsWithPagination({ entity, isChildrenTree: false });
    }
  }, [entity]); // include parentId: string | undefined to update on change page

  return (
    <Page>
      <div>
        <TableSectionHeader />
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

// export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
//   const res = await axiosInstance.get(PATH_AUTH.me, {
//     withCredentials: true,
//     headers: {
//       Cookie: context.req.headers.cookie,
//     },
//   });
//   const targetSection = allSectionArrayWithRoles.find(
//     (section) => section.entity === context.params?.entity
//   );
//   const role = res.data.user?.role;
//   if (!role || !targetSection?.roles.includes(role)) {
//     return {
//       props: {
//         data: '',
//       },
//     };
//     // return {
//     //   redirect: {
//     //     destination: '/404',
//     //     permanent: false,
//     //   },
//     // };
//   }
//   return {
//     props: {
//       data: res.data.user,
//     },
//   };
// };

export default CrudPage;
