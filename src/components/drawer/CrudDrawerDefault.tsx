/* eslint-disable react/jsx-pascal-case */
import { Button, createStyles, Drawer } from '@mantine/core';
import { useForm } from '@mantine/form';
import { cleanNotifications, hideNotification, showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState, useMemo } from 'react';
import { ParsedUrlQuery } from 'querystring';
import formFields from '../../../json/dataTable/formfields';
import { Icons } from '../../data/icons/icons';
import { errorNotificationData } from '../../data/showNofification/notificationObjects';
import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
import { getDefaultValues, sleep } from '../../utils/helper-functions';
// import classes from "./CrudDrawerDefault.module.css";
import FormFields from '../input/FormFields';
import { useDrawerContext } from '../../context/DataTableDrawerContext';

const useStyles = createStyles(() => ({
  drawer: {
    overflow: 'scroll',
  },
  form: {
    marginTop: 50,
  },
}));

export function CrudDrawerDefault() {
  const [submitting, setSubmitting] = useState(false);

  const { classes } = useStyles();
  const { query } = useRouter();
  const entity = query.entity as Sections;
  const sectionFormFields: FormFieldInterface[] = formFields[entity];
  const { closeDrawer, drawerIsOpen } = useDrawerContext();

  const {
    getSelectedDocument,
    updateCrudDocument,
    addCrud,
    crudStatus,
    crudError,
    selectCrudDocument,
  } = useCrudSlice(entity);

  const selectedDocument = getSelectedDocument(entity);

  /**
   * initialValues
   * defined here
   */
  const initialValues = useMemo(
    () => getDefaultValues(sectionFormFields, selectedDocument),
    [selectedDocument]
  );

  const form = useForm<Record<string, unknown>>({
    initialValues,
    // TODO: Make Validate function and set by string value from formField.
    // validate: 'email' uses this email validator.
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });
  /**
   *  Define submit function
   *  show notification/error
   */
  function handleCloseDrawer() {
    selectCrudDocument({ entity, document: null });
    closeDrawer();
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    showNotification({
      id: 'submit',
      message: 'Sending data to the server.',
      autoClose: false,
    });
    setSubmitting(true);

    /** Create new Document */
    if (!selectedDocument) {
      addCrud({ entity, newDocument: form.values, parentId: query.parentId as string });
    }
    /** Modify selected document */
    if (selectedDocument) {
      updateCrudDocument({
        entity,
        updateData: form.values,
        documentId: selectedDocument._id,
        parentId: query.parentId as string,
      });
    }
  };

  async function handleSubmitSucceed() {
    /**
     * delay for drawer closing and ect these lines
     * to handle multiple notifications
     * */
    await sleep(800);
    closeDrawer();
    await sleep(200);
    hideNotification('submit');
    await sleep(100);

    /** show success notification */
    showNotification({
      message: 'Operation success!!',
      title: 'Success',
      color: 'green',
      autoClose: 1000,
    });
    setSubmitting(false);
  }
  useEffect(() => {
    if (submitting) {
      if (crudStatus === 'loading') {
        null;
      }
      /** define case for succeed */
      if (crudStatus === 'succeed') {
        handleSubmitSucceed();
      }
      if (crudError) {
        hideNotification('submit');
        showNotification(errorNotificationData(crudError, 5000));
        setSubmitting(false);
        sleep(5000).then(() => cleanNotifications());
      }
    }
  }, [crudStatus]);

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]);

  return (
    <Drawer
      className={classes.drawer}
      opened={drawerIsOpen}
      onClose={handleCloseDrawer}
      title="Register"
      padding="xl"
      size="xl"
    >
      <Icons.close onClick={handleCloseDrawer} />
      <form className={classes.form} onSubmit={onSubmit}>
        {sectionFormFields?.map((formField) => (
          <FormFields
            // initialValues={initialValues}
            form={form}
            formField={formField}
            key={formField.id}
          />
        ))}
        <Button fullWidth disabled={submitting} type="submit" mt="xl" size="md">
          Add {entity}!
        </Button>
      </form>
    </Drawer>
  );
}
