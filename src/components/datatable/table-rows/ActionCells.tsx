import { Group, ActionIcon, Stack } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React from 'react';
import { useDrawerContext } from '../../../context/DataTableDrawerContext';
import { usePaginationContext } from '../../../context/PaginationContext';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';

export function ActionCells({ rowData }: { rowData: AllModels }) {
  const { paginationQuery } = usePaginationContext();

  /** use hook context */
  const { openDrawer } = useDrawerContext();
  /** use hook router hook */
  const { query } = useRouter();
  const parentId = query.parentId as string;
  const entity = query.entity as Sections;

  /** use hook useCrudSlice */
  // const { selectCrudDocument } = useCrudSlice();
  const { selectCrudDocument, deleteCrudDocument, deleteLinkedChildDocument } = useCrudSliceStore();

  // selectCrudDocument({ entity, document: rowData });

  const onModify = (): void => {
    selectCrudDocument({ entity, document: rowData });
    openDrawer();
  };

  const onDelete = (): void => {
    if (parentId) {
      deleteLinkedChildDocument({
        entity,
        documentId: rowData._id,
        query: paginationQuery,
        // parentId,
      });
      return;
    }
    deleteCrudDocument({ entity, documentId: rowData._id, query: paginationQuery });
  };

  return (
    <td>
      <Group spacing={0} align="center">
        <ActionIcon onClick={onModify}>
          <IconPencil size={16} stroke={1.5} />
        </ActionIcon>
        <ActionIcon color="red" onClick={onDelete}>
          <IconTrash size={16} stroke={1.5} />
        </ActionIcon>
      </Group>
    </td>
  );
}
