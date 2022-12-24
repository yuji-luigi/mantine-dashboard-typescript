import { useRouter } from 'next/router';

import { createStyles, Select, Switch, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React /* { FormEvent, Fragment, useEffect } */ from 'react';
// import { LoginFormValues } from '../../types/context/auth/formData';
// import formFields from '../../../json/dataTable/formfields';
// import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
// import InputFormField from './InputFormField';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { useGetSelectOptions } from '../../../hooks/form-related/useGetSelectOptions';

const useStyle = createStyles((theme) => ({
  formControl: {
    my: 5,
  },
}));

const FormFields = ({
  formField,
  form,
}: {
  formField: FormFieldInterface;
  form: UseFormReturnType<any, any>;
}) => {
  const { query } = useRouter();
  const entity = query.entity as Sections;

  const options = useGetSelectOptions(formField);

  // const { addCrud } = useCrudSlice(entity);

  // const form = useForm<LoginFormValues>({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //     termsOfService: false,
  //   },
  //   // TODO: Make Validate function and set by string value from formField.
  //   // validate: 'email' uses this email validator.
  //   validate: {
  //     email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  //   },
  // });
  // const onSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   addCrud({ entity, newDocument: form.values });
  // };
  return (
    <>
      {formField.type === 'text' && (
        <TextInput
          key={formField.id}
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}

      {formField.type === 'long-text' && (
        <Textarea
          rows={10}
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}
      {(formField.type === 'select' || formField.type === 'static-select') && (
        <Select
          data={options}
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}
      {formField.type === 'date' && (
        <DatePicker
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}
      {formField.type === 'boolean' && (
        <Switch
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          mt={10}
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}
      {formField.type === 'date-range' && (
        <DateRangePicker
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}
    </>
  );
};

export default FormFields;
