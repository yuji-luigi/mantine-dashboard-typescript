import { useRouter } from 'next/router';

import { Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { LoginFormValues } from '../../types/context/auth/formData';
import formFields from '../../../data/dataTable/formFields';
import { Sections } from '../../types/general/data/dataTable/sections-json';

const FormFields = () => {
  const { query } = useRouter();
  const entity = query.entity as Sections;
  const sectionformFields = formFields[entity];
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },
    // TODO: Make Validate function and set by string value from formField.
    // validate: 'email' uses this email validator.
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  return (
    <div>
      {sectionformFields.map((formField) => (
        <TextInput
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          {...form.getInputProps(formField.name || formField.id)}
        />
      ))}

      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Button fullWidth type="submit" mt="xl" size="md">
        Add User!
      </Button>
    </div>
  );
};

export default FormFields;
