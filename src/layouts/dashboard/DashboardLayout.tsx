import React from 'react';
import { createStyles } from '@mantine/core';
import { DashboardLayoutContextProvider } from '../../context/DashboardLayoutContext';
import { HeaderSearch } from './HeaderSearch';
import { NavbarVertical } from './NavbarVertical';

const useStyles = createStyles((theme /* _params, getRef */) => ({
  pageContent: {
    display: 'flex',
    position: 'relative',
    paddingTop: 50,
    [theme.fn.largerThan('md')]: {
      paddingLeft: 320,
    },
  },
}));

const DashboardLayout = ({ children }: { children: JSX.Element }) => {
  const { classes } = useStyles();
  return (
    <DashboardLayoutContextProvider>
      <HeaderSearch />
      <div className={classes.pageContent}>
        <NavbarVertical />
        {children}
      </div>
    </DashboardLayoutContextProvider>
  );
};

export default DashboardLayout;
