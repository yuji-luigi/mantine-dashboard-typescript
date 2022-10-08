import React from 'react';
import { createStyles, Container } from '@mantine/core';
import { DashboardLayoutContextProvider } from '../../../context/DashboardLayoutContext';
import { HeaderSearch } from './HeaderSearch';
import { NavbarVertical } from './NavbarVertical';

const useStyles = createStyles((/* theme, _params, getRef */) => ({
  pageContent: { display: 'flex' },
}));

const DashboardLayout = ({ children }: { children: JSX.Element }) => {
  const { classes } = useStyles();
  return (
    <DashboardLayoutContextProvider>
      <HeaderSearch />
      <div className={classes.pageContent}>
        <NavbarVertical />
        <Container sx={{ justifyContent: 'flex-start' }}>{children}</Container>
      </div>
    </DashboardLayoutContextProvider>
  );
};

export default DashboardLayout;
