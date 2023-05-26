import { MultiSelect, Select, SelectItem, TextInput } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import { DatePicker } from '@mantine/dates';

interface Prop {
  formField: FormFieldInterface;
  form: UseFormReturnTypeCustom;
}
const CrudDatePicker = ({ formField, form, ...others }: Prop) => {
  return (
    <DatePicker
      // name={formField.name}
      // label={formField.label}
      placeholder={formField.placeholder}
      size="md"
      mt={10}
      {...others}
      {...form.getInputProps(formField.name || formField.id)}
    />
  );
};

export default CrudDatePicker;
