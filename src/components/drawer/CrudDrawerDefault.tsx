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
import allFormFields from '../../../json/dataTable/formfields';
import { Icons } from '../../data/icons';
import { errorNotificationData } from '../../data/showNofification/notificationObjects';
// import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
import { capitalize, sleep } from '../../utils/helper-functions';
import { getDefaultValues } from '../../utils/getDefaultValues';
// import classes from "./CrudDrawerDefault.module.css";
import FormFields from '../input/FormFields';
import { useDrawerContext } from '../../context/DataTableDrawerContext';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { usePaginationQuery } from '../../context/PaginationContext';
import { hasMedia } from '../../redux/features/crudAsyncThunks';
import CreationToolBar from '../input/CreationToolBar';
import { UseFormReturnTypeCustom } from '../input/input_interfaces/useForm_interface';
import useAuth from '../../../hooks/useAuth';
import { sections, flattenSectionData, entities, sectionData } from '../../data';

import { extractUploadingMedia, uploadFileAndGetModelId } from '../../utils/upload-helper';
import { Sections } from '../../types/general/data/sections-type';

const useStyles = createStyles(() => ({
  drawer: {
    overflow: 'scroll',
    padding: 20,
  },
  form: {
    marginTop: 50,
    height: '100vh',
  },
}));

export function CrudDrawerDefault({ overridingEntity = '' }: { overridingEntity?: Sections }) {
  const [submitting, setSubmitting] = useState(false);

  const { query } = useRouter();
  const entity = overridingEntity || (query.entity as Sections);
  const sectionJson = flattenSectionData.find((section) => section.entity === entity);
  const { classes } = useStyles();
  const { user } = useAuth();
  const parentId = query.parentId as string;
  const paginationQuery = usePaginationQuery();
  const sectionFormFields: FormFieldInterface[] = allFormFields[entity];
  const { closeDrawer, drawerIsOpen } = useDrawerContext();

  const {
    createCrudDocumentWithPagination: addCrud,
    selectCrudDocument,
    updateCrudDocument,
    createLinkedChildDocumentWithPagination,
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

  const form = useForm({
    initialValues,
    // TODO: Make Validate function and set by string value from formField.
    // validate: 'email' uses this email validator.
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  }) as UseFormReturnTypeCustom;
  /**
   *  Define submit function
   *  show notification/error
   */
  function handleCloseDrawer() {
    closeDrawer();
    selectCrudDocument({ entity, document: null });
    // form.reset();
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    showNotification({
      id: 'submit',
      message: 'Sending data to the server.',
      autoClose: false,
    });
    setSubmitting(true);

    // const data = media ? extractUploadingMedia(media) : {};

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

    /** Create new Document */
    if (!selectedDocument._id) {
      if (parentId) {
        createLinkedChildDocumentWithPagination({
          entity,
          parentId,
          query: paginationQuery,
          newDocument: form.values,
        });
      } else {
        addCrud({ entity, newDocument: reqBody, parentId, query: paginationQuery });
      }
    }
    /** Modify selected document */
    if (selectedDocument._id) {
      updateCrudDocument({
        entity,
        updateData: reqBody,
        documentId: selectedDocument._id,
        parentId: query.parentId as string,
      });
    }
    // form.reset();
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
      if (crudError && crudStatus === 'failed') {
        hideNotification('submit');
        notifications.show(errorNotificationData(crudError, 5000));
        setSubmitting(false);
        sleep(5000).then(() => {
          notifications.hide('error');
          cleanNotifications();
        });
      }
    }
    () => {
      hideNotification('submit');
      hideNotification('error');
    };
  }, [crudStatus]);

  useEffect(() => {
    form.setValues(initialValues);
  }, [selectedDocument._id]);

  useEffect(() => {
    form.setValues(initialValues);
  }, [drawerIsOpen]);

  const entityText = capitalize(sectionJson?.entitySingle);
  const submitText = selectedDocument._id ? `Update ${entityText}!` : `Add ${entityText}!`;

  if (!drawerIsOpen) return null;
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
          entity={entity}
          submitButton={
            <Button fullWidth disabled={submitting} type="submit" mt="xl" size="md">
              {submitText}
            </Button>
          }
        />
      </form>
    </Drawer>
  );
}
