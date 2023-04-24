/* eslint-disable react/jsx-pascal-case */
import { Button, Container, createStyles, Drawer, LoadingOverlay, Text } from '@mantine/core';

import FormFields from '../../input/FormFields';
import allFormFields from '../../../../json/dataTable/formfields';
import { useState, FormEvent, useMemo, useEffect } from 'react';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { Form, useForm } from '@mantine/form';
import { FormCustom } from '../../../context/FormContextProvider';
import { getDefaultValues } from '../../../utils/getDefaultValues';
import { notifications } from '@mantine/notifications';
import axiosInstance from '../../../utils/axios-instance';
import CreationToolBar from '../../input/CreationToolBar';
import { UPLOAD_FOLDERS } from '../../../lib/enums';
import { UseFormReturnTypeCustom } from '../../input/input_interfaces/useForm_interface';
import { useRouter } from 'next/router';
import { hasMedia } from '../../../redux/features/crudAsyncThunks';
import { uploadFileAndGetModelId, extractUploadingMedia } from '../../../utils/upload-helper';
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  // withCredentials: true,
};

const useStyles = createStyles(() => ({
  drawer: {
    overflow: 'scroll',
  },
  form: {
    marginTop: 5,
    paddingInline: 15,
    maxWidth: 900,
  },
}));
const PostModalForm = () => {
  const router = useRouter();

  const { classes } = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const sectionFormFields: FormFieldInterface[] = allFormFields.threads;
  const { createCrudDocumentWithPagination } = useCrudSliceStore();
  const { crudMessage, crudStatus } = useCrudSelectors();
  const initialValues = useMemo(() => getDefaultValues(sectionFormFields), []);

  const form = useForm({
    initialValues,
  }) as UseFormReturnTypeCustom;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // media.images.push({ key: '' });
    const reqBody: Record<string, any> = {
      // ...media,
      // folderName: UPLOAD_FOLDERS.threads, // will be params and set to entity. threads or space or whatever.
      ...form.values,
      media: undefined,
    };
    const media = structuredClone(form.values.media);
    if (media && hasMedia(media)) {
      try {
        const uploadIdData = await uploadFileAndGetModelId(extractUploadingMedia(media), 'threads');
        for (let key in uploadIdData) {
          if (!reqBody[key]) reqBody[key] = [];
          reqBody[key] = [...reqBody[key], ...uploadIdData[key]];
        }
      } catch (error) {
        console.log(error);
        notifications.hide('submit');
        setSubmitting(false);
        return;
      }
    }
    createCrudDocumentWithPagination({
      entity: 'threads',
      newDocument: reqBody,
    });
    notifications.show({
      id: 'submit',
      message: 'Sending data to the server. Please wait...',
      autoClose: false,
      loading: true,
    });
    setSubmitting(true);
  };

  useEffect(() => {
    if (crudStatus === 'succeed' && submitting) {
      notifications.hide('submit');
      notifications.show({
        color: 'teal',
        loading: false,
        id: 'success',
        message: 'Successfully created a new thread.',
        autoClose: 5000,
      });
      setSubmitting(false);
      form.reset();
      // router.reload();
    }
    if (crudStatus === 'failed') {
      notifications.show({
        id: 'submit',
        message: crudMessage,
        autoClose: 5000,
      });
      setSubmitting(false);
    }
  }, [crudStatus]);

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      {crudStatus === 'loading' && (
        <>
          <Text>Please wait...</Text>
          <LoadingOverlay visible />
        </>
      )}
      {sectionFormFields?.map((formField) => (
        <FormFields
          // initialValues={initialValues}
          form={form}
          formField={formField}
          key={formField.id}
          minRows={formField.type === 'long-text' ? 10 : 3}
        />
      ))}
      <CreationToolBar
        formFields={sectionFormFields}
        form={form}
        entity="threads"
        submitButton={
          <Button fullWidth disabled={submitting} type="submit" mt="xl" size="md">
            Add Post!
          </Button>
        }
      />
    </form>
  );
};

export default PostModalForm;
