/* eslint-disable react/jsx-pascal-case */
import { Button, createStyles, Drawer } from '@mantine/core';

import FormFields from '../input/FormFields';
import formFields from '../../../json/dataTable/formfields';
import { useState, FormEvent, useMemo } from 'react';
import { useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { Form, useForm } from '@mantine/form';
import { FormCustom } from '../../context/FormContextProvider';
import { getDefaultValues } from '../../utils/helper-functions';

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
  const { createCrudDocument: addPost } = useCrudSliceStore();
  const initialValues = useMemo(() => getDefaultValues(sectionFormFields), []);

  const form = useForm<Record<string, unknown>>({
    initialValues,
  });
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // showNotification({
    //   id: 'submit',
    //   message: 'Sending data to the server.',
    //   autoClose: false,
    // });
    setSubmitting(true);

    /** Create new Document */

    form.reset();
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
      <Button fullWidth disabled={submitting} type="submit" mt="xl" size="md">
        Add Post!
      </Button>
    </form>
  );
};

export default PostModalForm;
