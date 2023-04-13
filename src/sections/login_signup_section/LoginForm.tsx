import { TextInput, PasswordInput, Checkbox, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { useForm } from '@mantine/form';

import useAuth from '../../../hooks/useAuth';
import { LoginFormValues } from '../../types/context/auth/formData';

import { Icons } from '../../data/icons';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../path/page-paths';

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
      // router.push(PATH_DASHBOARD.chooseRootSpace);
      // return null;
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        color: 'red',
        // eslint-disable-next-line react/jsx-pascal-case
        icon: <Icons.alert />,
        message: error.message || error || 'connection error',
        autoClose: 2000,
      });
      console.error(error.message || error);
    }
  };
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        name="email"
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Password"
        name="password"
        placeholder="Your password"
        mt="md"
        size="md"
        {...form.getInputProps('password')}
      />
      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Button fullWidth type="submit" mt="xl" size="md">
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
