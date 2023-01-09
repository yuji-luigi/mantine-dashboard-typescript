import React from 'react';
import BadgeCell from './table-rows/tablecell/BadgeCell';
// import BadgeCell from './table-rows/tablecell/BadgeCell';
import TableCell from './table-rows/tablecell/TableCell';

export function TableCellDecorator({
  rowData,
  cellConfig,
}: {
  rowData: UsersTableRow;
  cellConfig: FormFieldInterface;
}) {
  // const { query, push } = useRouter();

  // const sectionFormFields = formFields[query.entity as Sections];
  // if (!sectionFormFields) {
  //   push('/dashboard/home');
  //   return null;
  // }
  // sectionFormFields.sort((a, b) => a.priority - b.priority);

  const cellData = rowData[cellConfig.name!];
  // decorate the TableCell component before render.
  // EX put style: Array<string> then decorate the cell based on the style.
  if (cellConfig.badge) {
    let color = '__null';
    let queriedCellData = cellData;
    if (typeof cellData === 'object') {
      color = cellData.color as string;
      queriedCellData = cellData.text;
    }
    return (
      <td>
        <BadgeCell
          cellConfig={cellConfig}
          color={color}
          rowData={rowData}
          cellData={queriedCellData as string}
        />
      </td>
    );
  }
  return (
    <td>
      <TableCell
        cellData={rowData[cellConfig.name!] as string}
        cellConfig={cellConfig}
        rowData={rowData}
      />
    </td>
  );
}
