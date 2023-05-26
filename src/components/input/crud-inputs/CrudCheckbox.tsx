import { Checkbox, MultiSelect, Select, SelectItem, Switch, TextInput } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';

interface Prop {
  formField: FormFieldInterface;
  form: UseFormReturnTypeCustom;
  // checked: boolean;
}
const CrudCheckbox = ({ formField, form, ...others }: Prop) => {
  return (
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
  );
};

export default CrudCheckbox;
