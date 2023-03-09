import { createFormContext } from '@mantine/form';
import { TextInput } from '@mantine/core';

// Definition of form values is required
interface FormValues {
  age: number;
  name: string;
}

// createFormContext returns a tuple with 3 items:
// FormProvider is a component that sets form context
// useFormContext hook return form object that was previously set in FormProvider
// useForm hook works the same way as useForm exported from the package but has predefined type
const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();

function ContextField() {
  const form = useFormContext();
  return <TextInput label="Your name" {...form.getInputProps('name')} />;
}

export function Context() {
  // Create form as described in use-form documentation
  const form = useForm({
    initialValues: {
      age: 0,
      name: '',
    },
  });

  // Wrap your form with FormProvider
  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(() => {})}>
        <ContextField />
      </form>
    </FormProvider>
  );
}
