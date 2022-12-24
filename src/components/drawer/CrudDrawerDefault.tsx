import { Button, createStyles, Drawer, ScrollArea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { cleanNotifications, hideNotification, showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import formFields from '../../../json/dataTable/formfields';
import { Icons } from '../../data/icons/icons';
import { errorNotificationData } from '../../data/showNofification/notificationObjects';
import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
import { LoginFormValues } from '../../types/context/auth/formData';
import { sleep } from '../../utils/helper-functions';
// import classes from "./CrudDrawerDefault.module.css";
import FormFields from '../input/FormFields';
import { useDrawerContext } from '../../context/DataTableDrawerContext';

const useStyles = createStyles((theme) => ({
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

  /**
   * initialValues
   * defined here
   */
  const { addCrud, crudStatus, crudError } = useCrudSlice(entity);
  const form = useForm({
    initialValues: {
      name: '',
      password: '',
      termsOfService: false,
    },
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
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    showNotification({
      id: 'submit',
      message: 'Sending data to the server.',
      autoClose: false,
    });
    setSubmitting(true);
    addCrud({ entity, newDocument: form.values });
  };

  useEffect(() => {
    if (submitting) {
      if (crudStatus === 'loading') {
      }
      /** define case for succeed */
      if (crudStatus == 'succeed') {
        handleSubmitSucceed();
      }
      if (crudError) {
        hideNotification('submit');
        showNotification(errorNotificationData(crudError, 5000));
        setSubmitting(false);
        sleep(5000).then((_) => cleanNotifications());
      }
    }
  }, [crudStatus]);

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

  return (
    <Drawer
      className={classes.drawer}
      opened={drawerIsOpen}
      onClose={closeDrawer}
      title="Register"
      padding="xl"
      size="xl"
    >
      <Icons.close onClick={closeDrawer} />
      <form className={classes.form} onSubmit={onSubmit}>
        {sectionFormFields?.map((formField) => (
          <FormFields form={form} formField={formField} key={formField.id} />
        ))}
        <Button fullWidth disabled={crudStatus === 'loading'} type="submit" mt="xl" size="md">
          Add {entity}!
        </Button>
      </form>
    </Drawer>
  );
}

function createDefaultValues(formFields: FormFieldInterface[]): Record<any, any> {
  // const defauldValues

  return {};
}
