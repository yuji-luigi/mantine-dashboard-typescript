import { TextInput, PasswordInput } from '@mantine/core';
import React from 'react';
import { PasswordStrength } from '../../components/input/Password.Strength';
import { UseFormReturnType } from '@mantine/form';
import { RegisterData } from '../../types/context/auth/useAuth';
import { IInitialValues, initialValues } from './defaultValues';

const SignUpStepOne = ({ form }: { form: UseFormReturnType<IInitialValues> }) => {
  return (
    <>
      <TextInput label="Name" placeholder="First name" required {...form.getInputProps('name')} />
      <TextInput
        label="Surname"
        placeholder="Last nane"
        required
        {...form.getInputProps('surname')}
      />
      <TextInput
        label="Email"
        placeholder="you@mantine.dev"
        required
        {...form.getInputProps('email')}
      />
      <PasswordStrength formControl={form.getInputProps('password')} />
      <PasswordInput
        label="confirm password"
        placeholder="Confirm password"
        required
        mt="md"
        {...form.getInputProps('password2')}
      />
    </>
  );
};

export default SignUpStepOne;
