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
import { usePaginationContext } from '../../context/PaginationContext';

const CrudPage = () => {
  const { query, push } = useRouter();

  const entity = query.entity as Sections;
  const { setPagination, paginationQuery } = usePaginationContext();

  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  const { crudDocuments, isChildrenTree } = useCrudSelectors(entity);
  formFields as FormFieldsType;
  useEffect(() => {
    if (!sections.includes(entity)) {
      push('/dashboard/home');
    }

    // if (!crudDocuments.length) {
    //   fetchCrudDocumentsWithPagination({ entity });
    // }
    // if (isChildrenTree) {
    //   fetchCrudDocumentsWithPagination({ entity, isChildrenTree: false });
    // }
  }, [entity]); // include parentId: string | undefined to update on change page

  useEffect(() => {
    /** type guard */
    if (!entity) {
      return;
    }
    /** check if this is a childrenPage */
    if (query.parentId) {
      return;
    }
    /** fetch all the entity if not childrenpage */
    fetchCrudDocumentsWithPagination({ entity: entity, query: paginationQuery });
  }, [paginationQuery, entity, query.parentId]);

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
