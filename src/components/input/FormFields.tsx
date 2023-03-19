import { Checkbox, Select, Switch, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { DatePicker } from '@mantine/dates';
import { useGetSelectOptions } from '../../../hooks/form-related/useGetSelectOptions';
import { Dropzone } from '@mantine/dropzone';
import { DropzoneCustomImage } from './DropzoneCustomImage';
import { DropzoneCustomButton } from './DropzoneCustomButton';
import CreationToolBar from './CreationToolBar';
interface Props {
  formField: FormFieldInterface;
  // initialValues: Record<string, any>;
  minRows?: number;
  form: UseFormReturnType<Record<string, unknown>>;
  // submitButton?: ReactNode;
}
const FormFields = ({
  formField,
  // initialValues,
  form,
  // submitButton,
  ...others
}: Props) => {
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
          mt={10}
          {...others}
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}

      {formField.type === 'long-text' && (
        <Textarea
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          mt={10}
          {...others}
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
          mt={10}
          {...others}
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}
      {formField.type === 'date' && (
        <DatePicker
          // name={formField.name}
          // label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          mt={10}
          {...others}
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
          {...others}
          {...form.getInputProps(formField.name || formField.id)}
        />
      )}
      {formField.type === 'checkbox' && (
        <Checkbox
          checked={form.values[formField.name]}
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          mt={10}
          {...others}
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
