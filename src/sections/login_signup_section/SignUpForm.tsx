import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  createStyles,
} from '@mantine/core';

import Link from 'next/link';

import { useForm } from '@mantine/form';
import useAuth from '../../../hooks/useAuth';

import { PasswordStrength } from '../../components/input/Password.Strength';
import { RegisterData } from '../../types/context/auth/useAuth';
import GuestGuard from '../../guards/GuestGuard';
import { showNotification } from '@mantine/notifications';
import { Icons } from '../../data/icons';

const initialValues: RegisterData = {
  email: '',
  password: '',
  password2: '',
  name: '',
  surname: '',
};

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    div: {},
  },
  title: {
    fontSize: 40,
    fontWeight: 800,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },
  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  bgr: {
    background: 'red',
  },
}));

export function SignUpForm() {
  const { register } = useAuth();
  const { classes } = useStyles();
  const form = useForm({ initialValues });
  const onSubmit = async (data: RegisterData) => {
    try {
      // const {email, password, name, surname} = data;
      await register(data);
      // const response = await fetch(`${API_ENDPOINT}/auth/register`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data) as BodyInit,
      // });
      // const dataFromServer = await response.json();
      // console.log(dataFromServer);
    } catch (error: any) {
      showNotification({
        title: 'Error',
        color: 'red',
        icon: <Icons.alert />,
        message: error.message || error || 'connection error',
        autoClose: 2000,
      });
      console.error(error.message || error);
    }
  };

  return (
    <GuestGuard>
      <Container size={420} my={40}>
        <Title
          className={classes.title}
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Register
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account ? <Link href="/login">Login</Link>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={10} radius="md">
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              label="Name"
              placeholder="First name"
              required
              {...form.getInputProps('name')}
            />
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
            <Group position="apart" mt="md">
              <Checkbox label="Remember me" />
              <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </GuestGuard>
  );
}
