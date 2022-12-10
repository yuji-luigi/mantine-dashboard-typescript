import React, { ReactNode } from 'react';
import { createStyles, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { HeaderSearch } from './HeaderSearch';
import { NavbarVertical } from './NavbarVertical';
import useLayoutContext from '../../hooks/useLayoutContext';

const useStyles = createStyles((theme /* _params, getRef */) => ({
  pageContent: {
    display: 'flex',
    position: 'fixed',
    paddingTop: 50,
    paddingLeft: 30,
    [theme.fn.largerThan('md')]: {
      paddingLeft: 320,
    },
  },
}));

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { isOpen } = useLayoutContext();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const paddingSmOpen = isOpen && matches ? { paddingLeft: 320 } : {};
  return (
    <>
      <HeaderSearch />
      <div className={classes.pageContent} style={paddingSmOpen}>
        <NavbarVertical />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
