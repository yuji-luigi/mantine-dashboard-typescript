import { Button, createStyles, Drawer, ScrollArea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { hideNotification, showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import formFields from '../../../data/dataTable/formfields';
import { errorNotificationData } from '../../data/showNofification/objects';
import { useCrudSlice } from '../../hooks/redux-hooks/useCrudSlice';
import { LoginFormValues } from '../../types/context/auth/formData';
import { sleep } from '../../utils/helper-functions';
// import classes from "./CrudDrawerDefault.module.css";
import FormFields from '../input/FormFields';

const useStyles = createStyles((theme) => ({
  drawer: {
    overflow: 'scroll',
  },
}));

export function CrudDrawerDefault({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [submitting, setSubmitting] = useState(false);
  const { classes } = useStyles();
  const { query } = useRouter();
  const entity = query.entity as Sections;
  const sectionFormFields: FormFieldInterface[] = formFields[entity];

  /**
   * initialValues
   * defined here
   */
  const { addCrud, crudStatus, crudError } = useCrudSlice(entity);
  const form = useForm({
    initialValues: {
      name: 'aga',
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
        showNotification(errorNotificationData(crudError));
        setSubmitting(false);
      }
    }
  }, [crudStatus]);

  async function handleSubmitSucceed() {
    /**
     * delay for drawer closing and ect these lines
     * to handle multiple notifications
     * */
    await sleep(800);
    setOpened(false);
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
      opened={opened}
      onClose={() => setOpened(false)}
      title="Register"
      padding="xl"
      size="xl"
    >
      <div>
        <form onSubmit={onSubmit}>
          {sectionFormFields?.map((formField) => (
            <FormFields formField={formField} key={formField.id} />
          ))}
          <Button fullWidth disabled={crudStatus === 'loading'} type="submit" mt="xl" size="md">
            Add {entity}!
          </Button>
        </form>
      </div>
    </Drawer>
  );
}
