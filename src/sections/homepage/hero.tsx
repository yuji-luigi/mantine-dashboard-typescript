import { createStyles, Overlay, Container, Title, Button, Text, Transition } from '@mantine/core';
import { useState } from 'react';
// import { LoginForm } from '../../components/auth/LoginForm';

const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  container: {
    height: 700,
    maxWidth: 700,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: `calc(${theme.spacing.xl}) * 6`,
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      position: 'relative',
      height: 700,
      paddingBottom: `calc(${theme.spacing.xl}) * 3`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  },

  transitionContainer: {
    position: 'absolute',
    padding: 20,
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

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan('sm')]: {
      // width: '100%',
    },
  },
}));

const duration = 500;

export function HeroSection() {
  const { classes } = useStyles();
  const [isLogin, setIsLogin] = useState('');

  const transitionProperty = 'opacity, transform';

  // const transition = {
  //   in: { opacity: 1, transform: 'translate(0, 0)' },
  //   out: { opacity: 0, transform: 'translate(300px, 0)' },
  //   transitionProperty,
  // };
  const transition = {
    in: { opacity: 1, transform: 'translate(0, 0)' },
    out: { opacity: 0, transform: 'translate(300px, 0)' },
    transitionProperty,
  };
  // const transition = 'slide-right';

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />

      <Container className={classes.container}>
        {/* <Transition
          mounted={isLogin === ''}
          transition={transition}
          duration={duration}
          timingFunction="ease"
        >
          {(styles) => (
            <> */}
        <div className={classes.transitionContainer}>
          <Title className={classes.title}>Flat Mate&copy; Your living friend </Title>
          <Text className={classes.description} size="xl" mt="xl">
            We help you manage your teams. We have solution for all of the dimension of the team.
          </Text>
          {/* <Button
            onClick={() => setIsLogin('1')}
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
          >
            Get started
          </Button> */}
        </div>
        {/* </>
          )} */}
        {/* </Transition> */}
        {/* <Transition
          mounted={isLogin === '1'}
          transition={transition}
          duration={duration}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles} className={classes.transitionContainer}>
              <Title className={classes.title}>Next one? </Title>
              <Text className={classes.description} size="xl" mt="xl">
                Some descriptions here
              </Text>{' '}
              <Button
                variant="gradient"
                size="xl"
                radius="xl"
                className={classes.control}
                onClick={() => setIsLogin('2')}
              >
                more
              </Button>
            </div>
          )}
        </Transition>
        <Transition
          mounted={isLogin === '2'}
          transition={transition}
          duration={duration}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles} className={classes.transitionContainer}>
              <Title className={classes.title}>Third title </Title>
              <Text className={classes.description} size="xl" mt="xl">
                Last description
              </Text>{' '}
              <Button
                variant="gradient"
                size="xl"
                radius="xl"
                className={classes.control}
                onClick={() => setIsLogin('')}
              >
                from start
              </Button>
            </div>
          )}
        </Transition> */}
      </Container>
    </div>
  );
}
