/* eslint-disable react/jsx-pascal-case */
import { Button, createStyles, Drawer } from '@mantine/core';

import FormFields from '../input/FormFields';
import formFields from '../../../json/dataTable/formfields';
import { useState, FormEvent, useMemo, useEffect } from 'react';
import { useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { Form, useForm } from '@mantine/form';
import { FormCustom } from '../../context/FormContextProvider';
import { getDefaultValues } from '../../utils/helper-functions';
import { notifications } from '@mantine/notifications';
import axiosInstance from '../../utils/axios-instance';
import CreationToolBar from '../input/CreationToolBar';
import { UPLOAD_FOLDERS } from '../../lib/enums';
import { UseFormReturnTypeCustom } from '../input/input_interfaces/useForm_interface';
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
  const { classes } = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const sectionFormFields: FormFieldInterface[] = formFields.threads;
  const { createCrudDocument } = useCrudSliceStore();
  const initialValues = useMemo(() => getDefaultValues(sectionFormFields), []);

  const form = useForm({
    initialValues,
  }) as UseFormReturnTypeCustom;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('file', form.values.media.files[0]);
    // const rawData = await axiosInstance.post(
    //   `${process.env.NEXT_PUBLIC_API_URL}/upload-files`,
    //   { ...form.values.media, folderName: UPLOAD_FOLDERS.threads },
    //   config
    // );
    // const data = rawData.data.data;
    const media = structuredClone(form.values.media);

    const reqBody = {
      ...media,
      folderName: UPLOAD_FOLDERS.threads,
      ...form.values,
      media: undefined,
    };
    createCrudDocument({
      entity: 'threads',
      newDocument: reqBody,
      config,
    });
    notifications.show({
      id: 'submit',
      message: 'Sending data to the server.',
      autoClose: false,
    });
    // setSubmitting(true);

    /** Create new Document */

    // form.reset();
  };
  return (
    <form className={classes.form} onSubmit={onSubmit}>
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
