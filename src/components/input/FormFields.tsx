import { useRouter } from 'next/router';

import { Button, Checkbox, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { FormEvent } from 'react';
import { LoginFormValues } from '../../types/context/auth/formData';
import formFields from '../../../data/dataTable/formFields/index';
import { useCrudSlice } from '../../hooks/redux-hooks/useCrudSlice';

const FormFields = () => {
  const { query } = useRouter();
  const entity = query.entity as Sections;
  const sectionformFields = formFields[entity];
  const { addCrud } = useCrudSlice(entity);
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
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addCrud({ entity, newDocument: form.values });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        {sectionformFields.map((formField) => (
          <TextInput
            key={formField.id}
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
      </form>
    </div>
  );
};

export default FormFields;
