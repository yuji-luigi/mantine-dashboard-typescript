import { useRouter } from 'next/router';
import React from 'react';
import formFields from '../../../data/datatable/formFields';
import { UsersTableRow } from '../../types/general/data/datatable/objects';
import { Sections } from '../../types/general/data/datatable/sections-json';
import TableCell from './table-rows/tablecell/TableCell';

export function TableRow({ rowData }: { rowData: UsersTableRow }) {
  const { query, push } = useRouter();

  const sectionFormFields = formFields[query.entity as Sections];
  if (!sectionFormFields) {
    push('/dashboard/home');
    return null;
  }
  sectionFormFields.sort((a, b) => a.priority - b.priority);
  // decorate the TableCell component before render.
  // EX put style: Array<string> then decorate the cell based on the style.
  return (
    <tr>
      {sectionFormFields.map((cellConfig) => (
        <>
          <TableCell rowData={rowData} cellConfig={cellConfig} />
        </>
      ))}
    </tr>
  );
}
