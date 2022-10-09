import React from 'react';
import { createStyles } from '@mantine/core';
import { DashboardLayoutContextProvider } from '../../context/DashboardLayoutContext';
import { HeaderSearch } from './HeaderSearch';
import { NavbarVertical } from './NavbarVertical';
import AuthGuard from '../../guards/AuthGuard';

const useStyles = createStyles((/* theme, _params, getRef */) => ({
  pageContent: { display: 'flex', position: 'relative' },
}));

const DashboardLayout = ({ children }: { children: JSX.Element }) => {
  const { classes } = useStyles();
  return (
    <AuthGuard>
      <DashboardLayoutContextProvider>
        <HeaderSearch />
        <div className={classes.pageContent}>
          <NavbarVertical />
          {children}
        </div>
      </DashboardLayoutContextProvider>
    </AuthGuard>
  );
};

export default DashboardLayout;
