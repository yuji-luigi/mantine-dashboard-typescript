import React, { ReactElement } from 'react';
import AuthGuard from '../guards/AuthGuard';
import { MainLayout } from './main';

const Layout = ({
  variant = 'dashboard',
  children,
}: {
  variant?: string;
  children: ReactElement;
}) => {
  if (variant === 'logoOnly') {
    return (
      <>
        <p>logo only layout</p>
        {children}
      </>
    );
  }
  if (variant === 'main') {
    return <MainLayout>{children}</MainLayout>;
  }
  return <AuthGuard>{children}</AuthGuard>;
};

export default Layout;
