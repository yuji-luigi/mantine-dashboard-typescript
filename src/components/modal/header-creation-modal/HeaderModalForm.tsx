/* eslint-disable react/jsx-pascal-case */
import {
  Button,
  Container,
  createStyles,
  Drawer,
  LoadingOverlay,
  Select,
  SelectItem,
  Text,
} from '@mantine/core';

import FormFields from '../../input/FormFields';
import formFields from '../../../../json/dataTable/formfields';
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
import { useDisclosure } from '@mantine/hooks';
import useAuth from '../../../../hooks/useAuth';
import { PATH_API } from '../../../path/api-routes';
import { convertToSelectItems } from '../../../utils/helper-functions';
import OrganizationSpaceSelect from '../../select-custom/OrganizationSpaceSelect';
import { getCookie } from 'cookies-next';
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
const HeaderModalForm = ({ entity }: { entity: 'threads' | 'maintenances' }) => {
  const { classes } = useStyles();
  const { isSuperAdmin } = useAuth();
  // const [submitting, setSubmitting] = useState(false);
  const { submitting } = useCrudSelectors(entity);
  const sectionFormFields: FormFieldInterface[] = formFields[entity];
  const { setSubmitting, resetCrudStatus, createCrudDocument } = useCrudSliceStore();
  const { crudStatus, crudError } = useCrudSelectors();
  const initialValues = useMemo(() => getDefaultValues(sectionFormFields), []);
  // const [organizationOptions, setOrganizationOptions] = useState<SelectItem[] | []>([]);
  // const [spaceOptions, setSpaceOptions] = useState<SelectItem[] | []>([]);

  const form = useForm({
    initialValues,
  }) as UseFormReturnTypeCustom;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let reqBody: Record<string, any> = {
      ...form.values,
      media: undefined,
    };

    const media = structuredClone(form.values.media);

    if (media && hasMedia(media)) {
      try {
        console.log(extractUploadingMedia(media));
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

    createCrudDocument({ entity, newDocument: reqBody });
    // createCrudDocumentWithPagination({
    //   entity,
    //   newDocument: reqBody,
    //   // config,
    // });

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
      notifications.hide('submit');
      notifications.show({
        color: 'red',
        loading: false,
        id: 'failed',
        message: crudError,
        autoClose: 5000,
      });
      resetCrudStatus();
      setSubmitting(false);
    }
  }, [crudStatus]);
  // useEffect(() => {}, []);
  // async function getOrganizations() {
  //   const rawOrganizations = await axiosInstance.get(PATH_API.organizationAll);
  //   setOrganizationOptions(convertToSelectItems(rawOrganizations.data.data));
  // }
  // async function organizationSelected(organizationId: string) {
  //   console.log(organizationId);
  //   const rawSpaces = await axiosInstance.get(`${PATH_API.spaces}`, { params: { isMain: true } });
  //   setSpaceOptions(convertToSelectItems(rawSpaces.data.data));
  // }
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      {submitting && (
        // {crudStatus === 'loading' && (
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
      {isSuperAdmin && (
        <OrganizationSpaceSelect
          form={form}
          size="md"
          labels={{ organization: 'Organization', space: 'Spaces' }}
          sx={{ marginBlock: 16 }}
        />
      )}
      <CreationToolBar
        formFields={sectionFormFields}
        form={form}
        entity="threads"
        submitButton={
          <Button fullWidth disabled={submitting} type="submit" mt="xl" size="md">
            Add {entity}!
          </Button>
        }
      />
    </form>
  );
};

export default HeaderModalForm;
