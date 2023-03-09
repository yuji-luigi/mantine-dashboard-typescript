import { createFormContext } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { ReactNode } from 'react';

// Definition of form values is required
interface FormValues {
  age: number;
  name: string;
}

// createFormContext returns a tuple with 3 items:
// FormProvider is a component that sets form context
// useFormContext hook return form object that was previously set in FormProvider
// useForm hook works the same way as useForm exported from the package but has predefined type

function Form<FormDefaultValues>({ children }: { children: ReactNode }) {
  const [FormProvider, useFormContext, useForm] = createFormContext<FormDefaultValues>();
  const form = useFormContext();
  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(() => {})}>{children}</form>
    </FormProvider>
  );
}
