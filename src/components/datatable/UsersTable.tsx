import { Table, ScrollArea, Pagination, Divider } from '@mantine/core';
import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { TableRow } from './table-rows/TableRow';

import TableHeader from './table-rows/TableHeader';
// import TableCell from './table-rows/tablecell/TableCell';
import formFields from '../../../json/dataTable/formfields';
// import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
import { usePaginationContext } from '../../context/PaginationContext';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { DataTableModal } from '../modal/data-table-modal/DataTableModal';
import { useDisclosure } from '@mantine/hooks';
import { Sections } from '../../types/general/data/sections-type';

export function UsersTable({ overridingEntity = '' }: { overridingEntity?: Sections }) {
  const ROWS_PER_PAGE = 10;
  // const TOTAL = Math.ceil(users.length / ROWS_PER_PAGE);
  const [page, setPage] = useState(1);
  const { setPagination, paginationQuery } = usePaginationContext();
  const { query }: { query: ParsedQueryCustom } = useRouter();
  const entity = overridingEntity || (query.entity as Sections);
  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  const { crudDocuments, totalDocumentsCount, crudStatus } = useCrudSelectors(entity);

  const sectionFormFields = formFields[entity as Sections];
  useEffect(() => {
    setPage(1);
    setPagination(1);
  }, [entity]);

  if (!sectionFormFields) {
    return <h1>Please provide the formField.json file to display the table</h1>;
  }

  sectionFormFields.sort((a, b) => a.priority - b.priority);

  const TOTAL = Math.floor((totalDocumentsCount - 1) / ROWS_PER_PAGE) + 1;

  function onPageChange(pageNumber: number) {
    setPage(pageNumber);
    setPagination(pageNumber); //! after setting the pagination. useEffect will be called to fetch the documents
  }

  return (
    <>
      <ScrollArea>
        {!crudDocuments.length && crudStatus === 'loading' ? (
          <p>loading</p>
        ) : (
          <Table sx={{ minWidth: 800 }} highlightOnHover>
            <TableHeader overridingEntity={overridingEntity} />

            <tbody>
              {crudDocuments?.map((rowData: { _id: string }) => (
                <TableRow
                  overridingEntity={overridingEntity}
                  key={rowData._id}
                  sectionFormFields={sectionFormFields}
                  rowData={rowData}
                />
              ))}
            </tbody>
          </Table>
        )}
        <Divider sx={{ marginBottom: 20 }} />
      </ScrollArea>
      <Pagination value={page} onChange={(pageNumber) => onPageChange(pageNumber)} total={TOTAL} />
    </>
  );
}
