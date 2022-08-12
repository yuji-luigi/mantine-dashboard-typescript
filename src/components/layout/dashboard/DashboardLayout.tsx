import React from 'react';
import { HeaderSearch } from './HeaderSearch';
import { NavbarVertical } from './NavbarVertical';

const DashboardLayout = ({ children }: { children: JSX.Element }) => (
  <>
    <HeaderSearch />
    <NavbarVertical />
    {children}
  </>
);

export default DashboardLayout;
