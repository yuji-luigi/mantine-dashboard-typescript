import { ActionIcon, Group } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';
import React from 'react';
import { useRouter } from 'next/router';
import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
import { TableCellDecorator } from '../TableCellDecorator';

export function TableRow({
  rowData,
  sectionFormFields,
}: {
  rowData: AllModels;
  sectionFormFields: Array<FormFieldInterface>;
}) {
  const { query } = useRouter();
  const { deleteCrudDocument } = useCrudSlice();
  const onModify = (): void => {};
  const onDelete = (): void => {
    deleteCrudDocument({ entity: query.entity as Sections, documentId: rowData._id });
  };
  return (
    <tr key={rowData._id}>
      {sectionFormFields.map((cellConfig) => (
        <TableCellDecorator key={cellConfig.id} cellConfig={cellConfig} rowData={rowData} />
      ))}
      <td>
        <Group spacing={0} position="right">
          <ActionIcon onClick={onModify}>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" onClick={onDelete}>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );
}
