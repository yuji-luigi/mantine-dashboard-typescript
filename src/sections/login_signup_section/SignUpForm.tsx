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
  clsx,
  Flex,
} from '@mantine/core';

import Link from 'next/link';

import { UseFormReturnType, useForm } from '@mantine/form';
import useAuth from '../../../hooks/useAuth';

import { PasswordStrength } from '../../components/input/Password.Strength';
import { RegisterData } from '../../types/context/auth/useAuth';
import GuestGuard from '../../guards/GuestGuard';
import { notifications, showNotification } from '@mantine/notifications';
import { Icons } from '../../data/icons';
import SignUpStepOne from './SignUpStepOne';
import { useState } from 'react';
import SignUpStepTwo from './SignUpStepTwo';

import { IInitialValues, initialValues } from './defaultValues';
import SignUpConfirm from './SignUpConfirm';
import SignUpStepThree from './SignUpStepThree';
import { useRouter } from 'next/router';

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
const MAX_STEP = 2;

export function SignUpForm() {
  const { register } = useAuth();
  const router = useRouter();
  const { classes } = useStyles();
  const [steps, setSteps] = useState(0);
  const form = useForm<IInitialValues>({ initialValues });
  const onSubmit = async (data: RegisterData) => {
    try {
      // const {email, password, name, surname} = data;
      await register(data);
      notifications.show({
        title: 'Registered!',
        message: 'You have successfully registered',
        color: 'green',
        icon: <Icons.check />,
        autoClose: 2000,
        id: 'register-success',
      });
      router.push('/choose-root-space');
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
  const handleNext = () => {
    if (steps >= MAX_STEP) {
      setSteps(0);
      return;
    }
    setSteps(steps + 1);
  };
  const handlePrev = () => {
    if (steps <= 0) {
      setSteps(0);
      return;
    }
    setSteps(steps - 1);
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
        <Paper withBorder shadow="md" p={24} mt={10} radius="md">
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            {steps === 0 && <SignUpStepOne form={form} />}
            {steps === 1 && <SignUpStepTwo form={form} />}
            {/* {steps === 2 && <SignUpStepThree form={form} />} */}
            {steps === MAX_STEP && <SignUpConfirm form={form} />}
            <Group position="apart" mt="md">
              <Checkbox label="Remember me" />
            </Group>
            <Flex mt="xl" gap="md">
              <Button disabled={steps <= 0} type="button" fullWidth onClick={handlePrev} mt="xl">
                Prev
              </Button>
              <Button
                disabled={steps >= MAX_STEP}
                type="button"
                fullWidth
                onClick={handleNext}
                mt="xl"
              >
                Next
              </Button>
            </Flex>
            {steps === MAX_STEP && (
              <>
                <Button type="submit" fullWidth mt="xs">
                  Register
                </Button>
              </>
            )}
          </form>
        </Paper>
      </Container>
    </GuestGuard>
  );
}
