import React, { Fragment } from 'react';
import BadgeCell from './table-rows/tablecell/BadgeCell';
// import BadgeCell from './table-rows/tablecell/BadgeCell';
import TableCell from './table-rows/tablecell/TableCell';

function isObject(value: any): boolean {
  return value && typeof value === 'object' && !Array.isArray(value) && typeof value !== 'string';
}

export function TableCellDecorator({
  rowData,
  cellConfig,
}: {
  rowData: UsersTableRow;
  cellConfig: FormFieldInterface;
}) {
  /**
   * cellData can be an array of objects or a single object or a string.
   */
  const cellData = rowData[cellConfig.name];

  let badgeCell = <BadgeCell cellConfig={cellConfig} color={''} rowData={rowData} cellData={''} />;

  let tableCell =
    typeof cellData === 'string' ? (
      <TableCell cellData={cellData} cellConfig={cellConfig} rowData={rowData} />
    ) : typeof cellData === 'object' && !Array.isArray(cellData) ? (
      <TableCell
        key={cellData._id}
        cellData={
          cellConfig.selectValues
            ?.map((key) => cellData[key])
            // .concat('')
            .join('-') || ''
        }
        cellConfig={cellConfig}
        rowData={rowData}
      />
    ) : null;

  /**
   * if the cellData is an array, then we need to render multiple cells.
   */
  if (Array.isArray(cellData)) {
    tableCell = (
      <>
        {cellData.map((cellData) => {
          const key = typeof cellData === 'string' ? cellData : cellData._id;
          return (
            <TableCell
              key={key}
              cellData={
                cellConfig.selectValues
                  ?.map((key) => cellData[key])
                  // .concat('')
                  .join('-') || ''
              }
              cellConfig={cellConfig}
              rowData={rowData}
            />
          );
        })}
      </>
    );
    badgeCell = (
      <>
        {cellData.map((cellData) => {
          return (
            <BadgeCell
              key={cellData._id}
              cellConfig={cellConfig}
              color={cellData.color as string}
              rowData={rowData}
              cellData={
                cellConfig.selectValues
                  ?.map((key) => cellData[key])
                  // .concat('')
                  .join('-') || ''
              }
            />
          );
        })}
      </>
    );
  }

  // decorate the TableCell component before render.
  // EX put style: Array<string> then decorate the cell based on the style.
  if (cellConfig.noTable) return null;

  if (cellConfig.badge) {
    return badgeCell;
  }

  return tableCell;
}
