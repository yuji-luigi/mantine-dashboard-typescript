import { TextInput, PasswordInput, Select } from '@mantine/core';
import React, { useState } from 'react';
import { PasswordStrength } from '../../components/input/Password.Strength';
import { UseFormReturnType } from '@mantine/form';
import { RegisterData } from '../../types/context/auth/useAuth';
import { IInitialValues, initialValues } from './defaultValues';

const purposes = [
  { label: 'For flatmates', value: 'flatAdmin' },
  { label: 'I am a admin of condominium', value: 'condoAdmin' },
  { label: 'Create SNS for company', value: 'companyAdmin' },
];

const ORG_LABEL: Record<string, string> = {
  flatAdmin: 'Name of the flat. where you live.',
  companyAdmin: 'Name of organization',
  condoAdmin: 'Name of your organization.',
};
const ORG_PLACEHOLDER: Record<string, string> = {
  flatAdmin: 'GOLD STREET FOREVER',
  companyAdmin: 'DOCOMO.inc Tokyo',
  condoAdmin: 'Condominio via Roma since 1990',
};
const SPACE_NAME_LABEL: Record<string, string> = {
  flatAdmin: 'Name of the flat.',
  companyAdmin: 'Name of  building where workers are.',
  condoAdmin: 'Name of the building.',
};
const SPACE_NAME_PLACEHOLDER: Record<string, string> = {
  flatAdmin: 'building gold street 3, 2F, 202',
  companyAdmin: 'DOCOMO Tokyo B3',
  condoAdmin: 'condominio via roma 3/d',
};

const SignUpStepTwo = ({ form }: { form: UseFormReturnType<IInitialValues> }) => {
  const purposeValue = form.values.purpose;
  console.log(form.values);
  return (
    <>
      <Select
        data={purposes}
        name="purpose"
        label="Register as"
        size="md"
        mt={10}
        required
        {...form.getInputProps('purpose')}
      />{' '}
      <>
        <TextInput
          required
          label={ORG_LABEL[purposeValue || 'flatAdmin']}
          name="organization"
          placeholder={ORG_PLACEHOLDER[purposeValue || 'flatAdmin']}
          {...form.getInputProps('organization')}
        />
        <TextInput
          required
          label={SPACE_NAME_LABEL[purposeValue || 'flatAdmin']}
          name="space.name"
          placeholder={SPACE_NAME_PLACEHOLDER[purposeValue || 'flatAdmin']}
          {...form.getInputProps('space.name')}
        />
        <TextInput
          required
          label="address of the building"
          name="space.address"
          placeholder="gold street 3, 20888"
          {...form.getInputProps('space.address')}
        />
        <TextInput
          required
          label="Set password for the building"
          name="space.password"
          placeholder="secret777"
          {...form.getInputProps('space.password')}
        />
        {purposeValue === 'condoAdmin' && (
          <TextInput
            required
            label="How many apartments?"
            name="space.maxUsers"
            placeholder="Docomo HQ in washington"
            {...form.getInputProps('space.maxUsers')}
          />
        )}
      </>
    </>
  );
};

export default SignUpStepTwo;
