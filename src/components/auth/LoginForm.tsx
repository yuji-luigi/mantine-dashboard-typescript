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
  // Grid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PasswordStrength } from '../input/Password.Strength';

const API_ENDPOINT = process.env.HOST_API_BASE_URL;

interface LoginData {
  email?: string | null;
  password?: string | null;
}

const initialValues: LoginData = {
  email: '',
  password: '',
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
    color: theme.white,
    fontSize: 60,
    fontWeight: 900,
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
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  bgr: {
    background: 'red',
  },
}));

export function LoginForm() {
  const { classes } = useStyles();
  const form = useForm({ initialValues });
  const onSubmit = async (data: LoginData) => {
    const response = await fetch(`${API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) as BodyInit,
    });
    const dataFromServer = await response.json();
    console.log(dataFromServer);
  };
  return (
    <Container size={420} my={40}>
      <Title
        className={classes.title}
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      />
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account ?{' '}
        <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Login
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <PasswordStrength />
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
  );
}
