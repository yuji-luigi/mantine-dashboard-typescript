import { Box, Card, createStyles } from '@mantine/core';
import React from 'react';
import AboutCard from './AboutCard';

const useStyles = createStyles((theme) => ({
  sideBox: {
    width: '30%',
    gap: 16,
    display: 'flex',
    flexDirection: 'column',
    [theme.fn.smallerThan('md')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
    },
    [theme.fn.smallerThan('sm')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
      // flexDirection: 'row',
    },
  },
}));
const ProfileSide = () => {
  const { cx, classes, theme } = useStyles();

  return (
    <Box className={classes.sideBox}>
      <AboutCard
        title=""
        email="mario.japan@nintendo.com"
        phone="34289890987"
        company="super mario plumbers"
        address="via contardo ferrini 2/d lissone MB"
      />
      <Card>side card</Card>
      <Card>side card</Card>
    </Box>
  );
};

export default ProfileSide;
