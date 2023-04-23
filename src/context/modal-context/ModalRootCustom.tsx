import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Group, Button, Stack, Box, Sx } from '@mantine/core';
import { use_ModalContext } from './_ModalContext';

export interface _ModalContextStates {
  isOpenModal: boolean;
  closeModal: () => void;
  openModal: () => void;
  modals: ModalProps;
  toggleOpenModal: (isOpenModal: boolean) => void;
  openConfirmModal: (confirmModalProps: OpenConfirmModalParams) => void;
}

export interface OpenConfirmModalParams {
  title: string;
  type: 'confirm' | 'alert';
  centered?: boolean;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: (data: any) => void;
  sx?: {
    confirm?: Sx;
    cancel?: Sx;
  };
  labels: {
    confirm?: string;
    cancel?: string;
  };
}
export interface ModalProps extends OpenConfirmModalParams {
  id: string;
  sx: {
    confirm?: Sx;
    cancel?: Sx;
  };
}

interface ModalRootCustomProps {
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description: string;
  centered?: boolean;
  opened: boolean;
  close: () => void;
  labels: {
    confirm?: string;
    cancel?: string;
  };
}

export function ModalRootCustom() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { isOpenModal: opened, closeModal: close, modals } = use_ModalContext();

  const isAlert = modals.type === 'alert';

  const handleCancel = () => {
    modals.onCancel();
    close();
  };
  const handleConfirm = (data: any) => {
    modals.onConfirm(data);
    close();
  };
  return (
    <>
      <Modal opened={opened} centered={modals.centered} onClose={close} title={modals.title}>
        <Stack>
          {modals.children}
          <Box
            display="flex"
            sx={{ flexDirection: isMobile ? 'column' : 'row', gap: 8, justifyContent: 'end' }}
          >
            <Button sx={modals.sx.cancel} onClick={handleCancel}>
              {modals.labels.cancel}
            </Button>
            <Button
              sx={{ ...modals.sx.confirm, backgroundColor: isAlert ? 'red' : '' }}
              onClick={handleConfirm}
            >
              {modals.labels.confirm}
            </Button>
          </Box>
        </Stack>
      </Modal>
    </>
  );
}
