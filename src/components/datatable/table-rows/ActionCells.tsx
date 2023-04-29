import { Group, ActionIcon, Stack } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React from 'react';
import { useDrawerContext } from '../../../context/DataTableDrawerContext';
import { usePaginationContext } from '../../../context/PaginationContext';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { DialogDefault } from '../../modal/Dialog';
import { DeleteAlertModal } from '../../modal/DeleteAlertModal';
import { use_ModalContext } from '../../../context/modal-context/_ModalContext';
import { Text } from '@mantine/core';
import { Sections } from '../../../types/general/data/sections-type';
export function ActionCells({
  rowData,
  overridingEntity,
}: {
  rowData: AllModels;
  overridingEntity?: Sections;
}) {
  const { paginationQuery } = usePaginationContext();
  const { openModal, openConfirmModal, closeModal } = use_ModalContext();

  /** use hook context */
  const { openDrawer } = useDrawerContext();
  /** use hook router hook */
  const router = useRouter();
  const parentId = router.query.parentId as string;
  const entity = overridingEntity || (router.query.entity as Sections);

  /** use hook useCrudSlice */
  // const { selectCrudDocument } = useCrudSlice();
  const {
    selectCrudDocument,
    deleteCrudDocumentWithPagination,
    deleteLinkedChildDocumentWithPagination,
  } = useCrudSliceStore();

  // selectCrudDocument({ entity, document: rowData });

  const onModify = (): void => {
    selectCrudDocument({ entity, document: rowData });
    openDrawer();
  };

  const onDelete = (): void => {
    openConfirmModal({
      title: 'Delete',
      type: 'alert',
      centered: true,
      labels: {
        cancel: 'Cancel',
        confirm: 'Delete',
      },
      children: <Text>Are you sure delete the data??</Text>,
      onCancel: closeModal,
      onConfirm: () => {
        parentId
          ? deleteLinkedChildDocumentWithPagination({
              entity,
              documentId: rowData._id,
              query: paginationQuery,
              // parentId,
            })
          : deleteCrudDocumentWithPagination({
              entity,
              documentId: rowData._id,
              query: paginationQuery,
            });
        closeModal();
      },
    });
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
