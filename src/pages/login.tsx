/* eslint-disable react/jsx-pascal-case */
import { createStyles, Paper, Text, Title } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';

import Page from '../components/Page';
import GuestGuard from '../guards/GuestGuard';
import Layout from '../layouts';
import { API_BASE_URL, PATH_AUTH } from '../path/api-routes';
import { AUTH } from '../path/page-paths';
import LoginForm from '../sections/login_signup_section/LoginForm';
import DashboardTopPage from './dashboard/home';
import { DeleteAlertModal } from '../components/modal/DeleteAlertModal';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  link: {
    // color: 'black',
    fontWeight: 700,
    marginLeft: 8,
    textDecoration: 'none',
    color: theme.colors.green[5],
  },
  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  demoAccountBox: {
    padding: 10,
    border: 'solid black 1px',
    borderColor: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderRadius: 10,
    background: theme.colorScheme === 'dark' ? theme.colors.gray : '',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

const LoginPage = ({ user }: { user?: UserModel }) => {
  const { classes } = useStyles();
  if (user?.active) {
    return <DashboardTopPage />;
  }
  return (
    <GuestGuard>
      <Page title="Login">
        <div className={classes.wrapper}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
              Welcome back to Flatmates!
            </Title>
            <div className={classes.demoAccountBox}>
              <b>
                <span>-demo account-</span>
                <br />
                email: demo@testing.com
                <br />
                password: demo123
              </b>
            </div>
            <br />
            <LoginForm />
            <Text align="center" mt="md">
              Don&apos;t have an account?{' '}
              <Link className={classes.link} href={AUTH.SIGNUP}>
                Register
              </Link>
            </Text>
          </Paper>
        </div>
      </Page>
    </GuestGuard>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  if (page.props.user?.active) {
    return <Layout variant="dashboard">{page}</Layout>;
  }
  return <Layout variant="main">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const jwtToken = context.req.cookies.jwt;
    if (!jwtToken) {
      return { props: { user: null } };
    }
    // used fetch without reason. ok with axios instance too.
    const response = await fetch(`${API_BASE_URL}/${PATH_AUTH.me}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const data = await response.json();

    return {
      props: { user: data.user },
    };
  } catch (error) {
    return {
      props: { user: null },
    };
  }
}
