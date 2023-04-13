import { TextInput, PasswordInput, Select, Divider } from '@mantine/core';
import React, { useState } from 'react';
import { PasswordStrength } from '../../components/input/Password.Strength';
import { UseFormReturnType } from '@mantine/form';
import { RegisterData } from '../../types/context/auth/useAuth';
import { IInitialValues, initialValues } from './defaultValues';
import SimpleRow from '../../components/list/SimpleRow';

const SignUpStepTwo = ({ form }: { form: UseFormReturnType<IInitialValues> }) => {
  const purposeValue = form.values.purpose;
  return (
    <>
      <SimpleRow title="name" content={form.values.name} top />
      <SimpleRow title="surname" content={form.values.surname} />
      <SimpleRow title="email" content={form.values.email} />
      <SimpleRow title="password" content="****" />
      <SimpleRow title="you are" content={form.values.purpose} />
      <SimpleRow title="your organization" content={form.values.organization} />
      <SimpleRow title="Name of the place" content={form.values.space.name} />
      <SimpleRow title="Address of the place" content={form.values.space.address} />
      {purposeValue === 'condoAdmin' && (
        <SimpleRow title="Apartments" content={form.values.space.maxUsers} />
      )}
      <SimpleRow title="Password of building" content={form.values.space.password} />
    </>
  );
};

export default SignUpStepTwo;
