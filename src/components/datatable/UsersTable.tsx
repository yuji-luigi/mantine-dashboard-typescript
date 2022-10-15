import { Table, ScrollArea, Pagination } from '@mantine/core';
import { useState } from 'react';

import { useRouter } from 'next/router';
import { TableRow } from './TableRow';
import users from '../../../data/mock/usersDatatable.json';
import TableHeader from './table-rows/TableHeader';
import TableCell from './table-rows/tablecell/TableCell';
import { UsersTableRow } from '../../types/general/data/datatable/objects';
import { Sections } from '../../types/general/data/datatable/sections-json';
import formFields from '../../../data/datatable/formFields';

export function UsersTable({ data }: { data: Array<UsersTableRow> }) {
  const ROWS_PER_PAGE = 5;
  const TOTAL = Math.ceil(users.length / ROWS_PER_PAGE);
  const [page, setPage] = useState(1);
  // const { query, push } = useRouter();

  // const sectionFormFields = formFields[query.entity as Sections];
  // if (!sectionFormFields) {
  //   push('/dashboard/home');
  //   return null;
  // }
  // sectionFormFields.sort((a, b) => a.priority - b.priority);
  return (
    <>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <TableHeader />
          <tbody>
            {data.map((rowData) => (
              <TableRow rowData={rowData} />
            ))}
          </tbody>
        </Table>
      </ScrollArea>
      <Pagination page={page} onChange={setPage} total={TOTAL} />
    </>
  );
}
