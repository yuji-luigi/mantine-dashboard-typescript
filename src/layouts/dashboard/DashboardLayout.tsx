import React, { ReactNode } from 'react';
import { createStyles, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { DashboardHeaderSearch } from './DashboardHeaderSearch';
import { NavbarVertical } from './NavbarVertical';
import useLayoutContext from '../../../hooks/useLayoutContext';

const useStyles = createStyles((theme /* _params, getRef */) => ({
  pageContent: {
    zIndex: 10,
    // display: 'flex',
    // alignItems: 'center',
    paddingTop: 50,
    [theme.fn.largerThan('md')]: {
      paddingLeft: 300,
    },
  },
}));

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { isOpen } = useLayoutContext();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const paddingSmOpen = isOpen && matches ? { paddingLeft: 300 } : {};
  return (
    <>
      <DashboardHeaderSearch />
      <div className={classes.pageContent} style={paddingSmOpen}>
        <NavbarVertical />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
