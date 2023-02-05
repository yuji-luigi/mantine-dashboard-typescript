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

export function UsersTable({ entityOverride = '' }: { entityOverride?: string }) {
  const ROWS_PER_PAGE = 10;
  // const TOTAL = Math.ceil(users.length / ROWS_PER_PAGE);
  const [page, setPage] = useState(1);
  const { setPagination, paginationQuery } = usePaginationContext();
  const { query } = useRouter();
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocuments, totalDocumentsCount } = useCrudSelectors(query.entity as Sections);

  const sectionFormFields = formFields[query.entity as Sections];

  /** might need handle entityOverride with context in the future */
  useEffect(() => {
    if (entityOverride) {
      null;
    }
  }, []);

  useEffect(() => {
    /** check if this is a childrenPage */
    if (query.parentId) {
      return;
    }
    /** fetch all the entity if not childrenpage */
    fetchCrudDocuments({ entity: query.entity as Sections, query: paginationQuery });
  }, [paginationQuery]);

  if (!sectionFormFields) {
    return <h1>Please provide the formField.json file to display the table</h1>;
  }

  sectionFormFields.sort((a, b) => a.priority - b.priority);

  const TOTAL = Math.floor((totalDocumentsCount - 1) / ROWS_PER_PAGE) + 1;

  function onPageChange(pageNumber: number) {
    setPage(pageNumber);
    setPagination(pageNumber); //! after setting the pagination. useEffect will be called to fetch the documents
    // fetchCrudDocuments({ entity: query.entity as Sections, query: `?skip=${pageNumber}` });
  }

  return (
    <>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} highlightOnHover>
          <TableHeader />
          <tbody>
            {/* TODO: screate crudDocuments type that includes all possible fields in mongooseDocument.  */}
            {crudDocuments?.map((rowData: { _id: string }) => (
              <TableRow key={rowData._id} sectionFormFields={sectionFormFields} rowData={rowData} />
            ))}
          </tbody>
        </Table>
        <Divider sx={{ marginBottom: 20 }} />
      </ScrollArea>
      <Pagination page={page} onChange={(pageNumber) => onPageChange(pageNumber)} total={TOTAL} />
    </>
  );
}
