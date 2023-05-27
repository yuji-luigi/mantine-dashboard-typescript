import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Group, Button, Stack, Box, Sx, useMantineTheme, createStyles } from '@mantine/core';
import { use_ModalContext } from './_ModalContext';
import { getDefaultValues } from '../../utils/getDefaultValues';
import { showNotification, notifications } from '@mantine/notifications';
import { FormEvent, useMemo, useState } from 'react';
import { hasMedia } from '../../redux/features/crudAsyncThunks';
import { uploadFileAndGetModelId, extractUploadingMedia } from '../../utils/upload-helper';
import CreationToolBar from '../../components/input/CreationToolBar';
import FormFields from '../../components/input/FormFields';
import { useForm } from '@mantine/form';
import { UseFormReturnTypeCustom } from '../../components/input/input_interfaces/useForm_interface';
import { getWordNextToFromUrl, sleep } from '../../utils/helper-functions';
import { Sections } from '../../types/general/data/sections-type';
import { useRouter } from 'next/router';
import { useCrudSliceStore } from '../../redux/features/crud/crudSlice';

const useStyles = createStyles(() => ({
  modal: {
    overflow: 'scroll',
    zIndex: 1000,
  },
  modalContent: {
    zIndex: 10,
    paddingInline: 48,
  },
  form: {
    marginTop: 50,
    height: '100vh',
  },
}));

export function CrudModal() {
  const { classes } = useStyles();
  const entity = getWordNextToFromUrl() as Sections;
  const { query } = useRouter();
  const parentId: string = query.parentId as string;

  const isMobile = useMediaQuery('(max-width: 600px)');
  const { isOpenModal: opened, closeModal: close, modals } = use_ModalContext();
  const { updateCrudDocument } = useCrudSliceStore();
  const [submitting, setSubmitting] = useState(false);
  const handleConfirm = (data: any) => {
    modals.onConfirm(data);
    close();
  };

  // type guard
  if (modals.type !== 'crud') return null;

  const initialValues = useMemo(
    () => getDefaultValues(modals.formFields, modals.crudDocument),
    [modals.crudDocument]
  );
  const form = useForm({
    initialValues,
    // TODO: Make Validate function and set by string value from formField.
    // validate: 'email' uses this email validator.
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  }) as UseFormReturnTypeCustom;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    showNotification({
      id: 'submit',
      message: 'Sending data to the server.',
      autoClose: false,
    });
    setSubmitting(true);

    // // const data = media ? extractUploadingMedia(media) : {};

    let reqBody: Record<string, any> = {
      ...form.values,
      // ...data,

      media: undefined,
    };
    const media = structuredClone(form.values.media);

    if (media && hasMedia(media)) {
      try {
        const uploadIdData = await uploadFileAndGetModelId(extractUploadingMedia(media), entity);
        for (let key in uploadIdData) {
          reqBody[key] = [...reqBody[key], ...uploadIdData[key]];
        }
      } catch (error) {
        console.log(error);
        notifications.hide('submit');
        setSubmitting(false);
        return;
      }
    }

    /** Modify selected document */
    if (modals.crudDocument._id) {
      updateCrudDocument({
        entity,
        updateData: reqBody,
        documentId: modals.crudDocument._id,
        parentId: query.parentId as string,
      });
    }

    form.reset();
    await sleep(1000);
    notifications.hide('submit');
    notifications.show({
      title: 'Success',
      message: 'Data sent to the server.',
      color: 'green',
      autoClose: 1500,
    });
    console.log('form.values', form.values);
    close();
  };
  if (!opened) return null;
  return (
    <>
      <Modal
        className={classes.modal}
        opened={opened}
        centered
        onClose={close}
        title={modals.title}
        size="lg"
        fullScreen={isMobile}
      >
        <Stack className={classes.modalContent}>
          <form className={classes.form} onSubmit={onSubmit}>
            {modals.formFields?.map((formField) => (
              <FormFields
                // initialValues={initialValues}
                form={form}
                formField={formField}
                key={formField.id}
              />
            ))}
            <CreationToolBar
              formFields={modals.formFields}
              form={form}
              entity={entity}
              submitButton={
                <>
                  <Button fullWidth /* disabled={submitting}  */ type="submit" mt="xl" size="md">
                    Submit{' '}
                  </Button>
                  <Button
                    fullWidth
                    /* disabled={submitting}  */ mt={0}
                    color="gray.6"
                    onClick={close}
                    size="md"
                  >
                    Cancel{' '}
                  </Button>
                </>
              }
            />
          </form>
        </Stack>
      </Modal>
    </>
  );
}
function createLinkedChildDocumentWithPagination(arg0: {
  entity: string;
  parentId: string;
  query: any;
  newDocument: { media?: { [key: string]: File[] | UploadModel[] } | undefined } & Record<
    string,
    unknown
  >;
}) {
  throw new Error('Function not implemented.');
}
