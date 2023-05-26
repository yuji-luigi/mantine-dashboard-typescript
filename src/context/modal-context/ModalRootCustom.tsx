import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Group, Button, Stack, Box, Sx } from '@mantine/core';
import { use_ModalContext } from './_ModalContext';
import { CrudModal } from './CrudModal';

export interface _ModalContextStates {
  isOpenModal: boolean;
  closeModal: () => void;
  openModal: () => void;
  modals: ModalProps;
  toggleOpenModal: (isOpenModal: boolean) => void;
  openConfirmModal: (confirmModalProps: OpenConfirmModalParams) => void;
}

type BaseModalParams = {
  title: string;
  centered?: boolean;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: (data: any) => void;
};

interface ConfirmAlertModalParams extends BaseModalParams {
  type: 'confirm' | 'alert';
  formFields?: FormFieldInterface[];
  sx?: {
    confirm?: Sx;
    cancel?: Sx;
  };
  labels: {
    confirm?: string;
    cancel?: string;
  };
}

interface CrudModalParams extends BaseModalParams {
  type: 'crud';
  formFields: FormFieldInterface[];
  crudDocument?: AllModels;
}

export type OpenConfirmModalParams = ConfirmAlertModalParams | CrudModalParams;

export type ModalProps = OpenConfirmModalParams & {
  id: string;
  labels: {
    confirm?: string;
    cancel?: string;
  };
  sx: {
    confirm?: Sx;
    cancel?: Sx;
  };
};

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

  if (modals.type === 'crud') {
    return <CrudModal />;
  }
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
