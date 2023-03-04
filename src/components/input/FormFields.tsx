import { Select, Switch, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { DatePicker } from '@mantine/dates';
import { useGetSelectOptions } from '../../../hooks/form-related/useGetSelectOptions';

const FormFields = ({
  formField,
  // initialValues,
  form,
}: {
  formField: FormFieldInterface;
  // initialValues: Record<string, any>;
  form: UseFormReturnType<Record<string, unknown>>;
}) => {
  const options = useGetSelectOptions(formField);

  // const { addCrud } = useCrudSlice(entity);

  // const form = useForm<LoginFormValues>({
  //   initialValues,
  // TODO: Make Validate function and set by string value from formField.
  // validate: 'email' uses this email validator.
  //   validate: {
  //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
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
          // name={formField.name}
          // label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}
      {formField.type === 'boolean' && (
        <Switch
          checked={form.values[formField.name]}
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          mt={10}
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}
      {/* {formField.type === 'date-range' && (
        <DateRangePicker
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          {...form.getInputProps(formField.name || formField.id)}
        />
      )} */}
    </>
  );
};

export default FormFields;
