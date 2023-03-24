/* eslint-disable react/jsx-pascal-case */
import { Button, createStyles, Drawer } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  cleanNotifications,
  hideNotification,
  notifications,
  showNotification,
} from '@mantine/notifications';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState, useMemo } from 'react';
import formFields from '../../../json/dataTable/formfields';
import { Icons } from '../../data/icons';
import { errorNotificationData } from '../../data/showNofification/notificationObjects';
// import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
import { sleep } from '../../utils/helper-functions';
import { getDefaultValues } from '../../utils/getDefaultValues';
// import classes from "./CrudDrawerDefault.module.css";
import FormFields from '../input/FormFields';
import { useDrawerContext } from '../../context/DataTableDrawerContext';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { usePaginationQuery } from '../../context/PaginationContext';
import { addLinkedChildrenDocument } from '../../redux/features/crudAsyncThunks';
import CreationToolBar from '../input/CreationToolBar';

const useStyles = createStyles(() => ({
  drawer: {
    overflow: 'scroll',
  },
  form: {
    marginTop: 50,
  },
}));

export function CrudDrawerDefault({ overrideEntity = '' }: { overrideEntity?: Sections }) {
  const [submitting, setSubmitting] = useState(false);

  const { classes } = useStyles();

  const { query } = useRouter();

  const entity = overrideEntity || (query.entity as Sections);

  const parentId = query.parentId as string;

  const paginationQuery = usePaginationQuery();

  const sectionFormFields: FormFieldInterface[] = formFields[entity];
  const { closeDrawer, drawerIsOpen } = useDrawerContext();

  const {
    createCrudDocument: addCrud,
    selectCrudDocument,
    updateCrudDocument,
    createLinkedChildDocument,
  } = useCrudSliceStore();
  const {
    selectedCrudDocument: selectedDocument,
    crudStatus,
    crudError,
  } = useCrudSelectors(entity);

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
    closeDrawer();
    selectCrudDocument({ entity, document: null });
    form.reset();
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
    if (!selectedDocument._id) {
      if (parentId) {
        createLinkedChildDocument({
          entity,
          parentId,
          query: paginationQuery,
          newDocument: form.values,
        });
      } else {
        addCrud({ entity, newDocument: form.values, parentId, query: paginationQuery });
      }
    }
    /** Modify selected document */
    if (selectedDocument._id) {
      updateCrudDocument({
        entity,
        updateData: form.values,
        documentId: selectedDocument._id,
        parentId: query.parentId as string,
      });
    }
    form.reset();
  };

  /** todo: separate the function in to hooks or util function.*/
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

  /** runs every time crudStatus changed */
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
        notifications.show(errorNotificationData(crudError, 5000));
        setSubmitting(false);
        sleep(5000).then(() => cleanNotifications());
      }
    }
  }, [crudStatus]);

  useEffect(() => {
    form.setValues(initialValues);
  }, [selectedDocument._id]);

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
    </Drawer>
  );
}
