import { MultiSelect, SelectItem, TextInput } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';

interface Prop {
  formField: FormFieldInterface;
  form: UseFormReturnTypeCustom;
  options: (string | SelectItem)[];
}
const CrudSelectMulti = ({ formField, form, options, ...others }: Prop) => {
  return (
    <MultiSelect
      searchable
      data={options}
      name={formField.name}
      label={formField.label}
      placeholder={formField.placeholder}
      size="md"
      mt={10}
      {...others}
      {...form.getInputProps(formField.name || formField.id)}
    />
  );
};

export default CrudSelectMulti;
